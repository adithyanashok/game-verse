import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database';
import { Game } from './entities/game.entity';
import { Genre } from './entities/genre.entity';
import { GenreService } from './genre/genre.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CONFIG, ServiceName } from 'libs/common/src';
import { AiProvider } from './providers/ai.provider';
import { Overview } from './entities/overview.entity';

const ENV = process.env.NODE_ENV;
console.log(ENV);
@Module({
  imports: [
    TypeOrmModule.forFeature([Game, Genre, Overview]),
    ClientsModule.register({
      clients: [
        {
          name: ServiceName.REVIEW,
          transport: Transport.TCP,
          options: {
            host: MICROSERVICE_CONFIG.REVIEW_SERVICE.host,
            port: MICROSERVICE_CONFIG.REVIEW_SERVICE.port,
          },
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? 'apps/game/.env' : `apps/game/.env.${ENV}`,
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
        entities: [Game, Genre, Overview],
        // autoLoadEntities: config.get<boolean>('database.autoLoadEntities'),
        synchronize: config.get<boolean>('database.synchronize'),
      }),
    }),
  ],
  controllers: [GameController],
  providers: [GameService, GenreService, AiProvider],
})
export class GameModule {}
