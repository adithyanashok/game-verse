import { Module } from '@nestjs/common';
import { DiscussionController } from './discussion.controller';
import { DiscussionService } from './discussion.service';
import { EventsModule } from './events/events.module';
import { SocketIoClientProvider } from './socket-io.provider';
import { ConfigModule, ConfigService } from '@nestjs/config';
import database from './config/database';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discussion } from './entities/Discussion';
import { Message } from './entities/Message';
import { DiscussionBlockList } from './entities/DiscussionBlockList';
const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    EventsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV
        ? 'apps/discussion/.env'
        : `apps/discussion/.env.${ENV}`,
      load: [database],
    }),
    TypeOrmModule.forFeature([Discussion, Message, DiscussionBlockList]),
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
          entities: [Discussion, Message, DiscussionBlockList],
        };
      },
    }),
  ],
  controllers: [DiscussionController],
  providers: [DiscussionService, SocketIoClientProvider],
  exports: [DiscussionService],
})
export class DiscussionModule {}
