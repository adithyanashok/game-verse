import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database';
const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? 'apps/user/.env' : `apps/user/.env.${ENV}`,
      load: [database],
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          database: configService.get<string>('database.name'),
          synchronize: configService.get<boolean>('database.synchronize'),
          password: configService.get<string>('database.password'),
          port: configService.get<number>('database.port'),
          host: configService.get<string>('database.host'),
          username: configService.get<string>('database.username'),
          autoLoadEntities: configService.get<boolean>(
            'database.autoLoadEntities',
          ),
          entities: [User],
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserService],
})
export class UserModule {}
