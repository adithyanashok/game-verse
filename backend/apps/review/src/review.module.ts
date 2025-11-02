import { Module } from '@nestjs/common';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from '../config/database.config';
import { Review } from '../entities/review.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CONFIG, ServiceName } from 'libs/common/src';
import { Like } from '../entities/like.entity';
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ServiceName.GAME,
        transport: Transport.TCP,
        options: {
          host: MICROSERVICE_CONFIG.GAME_SERVICE.host,
          port: MICROSERVICE_CONFIG.GAME_SERVICE.port,
        },
      },
    ]),
    TypeOrmModule.forFeature([Review, Like]),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? 'apps/review/.env' : `apps/review/.env.${ENV}`,
      load: [databaseConfig],
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
        entities: [Review, Like],
        // autoLoadEntities: config.get<boolean>('database.autoLoadEntities'),
        synchronize: config.get<boolean>('database.synchronize'),
      }),
    }),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
