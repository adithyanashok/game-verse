import { forwardRef, Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { DiscussionModule } from '../discussion.module';
import { WsAuthGuard } from './guards/ws-jwt.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({}),
    forwardRef(() => DiscussionModule),
  ],
  providers: [EventsGateway, WsAuthGuard],
  exports: [EventsGateway],
})
export class EventsModule {}
