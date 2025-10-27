import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database';
import { Game } from './entities/game.entity';

const ENV = process.env.NODE_ENV;
console.log(ENV);
@Module({
  imports: [
    TypeOrmModule.forFeature([Game]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [database],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        entities: [Game],
        // autoLoadEntities: config.get<boolean>('database.autoLoadEntities'),
        synchronize: config.get<boolean>('database.synchronize'),
      }),
    }),
  ],
  controllers: [GameController],
  providers: [GameService],
})
export class GameModule {}
