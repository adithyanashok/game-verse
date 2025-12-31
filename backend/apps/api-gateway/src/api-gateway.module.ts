import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceName } from 'libs/common/src';
import { GameController } from '../game/game.controller';
import { MICROSERVICE_CONFIG } from 'libs/common/src/constants/microservice.constants';
import { ReviewController } from '../review/review.controller';
import { AuthController } from '../auth/auth.controller';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';
import { APP_GUARD } from '@nestjs/core';
import { UserController } from '../user/user.controller';
import { DiscussionController } from '../discussion/discussion.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: ServiceName.GAME,
        useFactory: () => {
          const host = MICROSERVICE_CONFIG.GAME_SERVICE.host;
          console.log(
            `Configuring GAME_SERVICE client: host=${host}, env=${process.env.NODE_ENV}`,
          );
          return {
            transport: Transport.TCP,
            options: {
              host,
              port: MICROSERVICE_CONFIG.GAME_SERVICE.port,
            },
          };
        },
      },
      {
        name: ServiceName.REVIEW,
        useFactory: () => {
          const host = MICROSERVICE_CONFIG.REVIEW_SERVICE.host;
          console.log(`Configuring REVIEW_SERVICE client: host=${host}`);
          return {
            transport: Transport.TCP,
            options: {
              host,
              port: MICROSERVICE_CONFIG.REVIEW_SERVICE.port,
            },
          };
        },
      },
      {
        name: ServiceName.AUTH,
        useFactory: () => {
          const host = MICROSERVICE_CONFIG.AUTH_SERVICE.host;
          console.log(`Configuring AUTH_SERVICE client: host=${host}`);
          return {
            transport: Transport.TCP,
            options: {
              host,
              port: MICROSERVICE_CONFIG.AUTH_SERVICE.port,
            },
          };
        },
      },
      {
        name: ServiceName.USER,
        useFactory: () => {
          const host = MICROSERVICE_CONFIG.USER_SERVICE.host;
          console.log(`Configuring USER_SERVICE client: host=${host}`);
          return {
            transport: Transport.TCP,
            options: {
              host,
              port: MICROSERVICE_CONFIG.USER_SERVICE.port,
            },
          };
        },
      },
      {
        name: ServiceName.DISCUSSION,
        useFactory: () => {
          const host = MICROSERVICE_CONFIG.DISCUSSION_SERVICE.host;
          console.log(`Configuring DISCUSSION_SERVICE client: host=${host}`);
          return {
            transport: Transport.TCP,
            options: {
              host,
              port: MICROSERVICE_CONFIG.DISCUSSION_SERVICE.port,
            },
          };
        },
      },
    ]),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
  ],
  controllers: [
    ApiGatewayController,
    GameController,
    ReviewController,
    AuthController,
    UserController,
    DiscussionController,
  ],
  providers: [
    ApiGatewayService,
    JwtAuthGuard,
    RoleGuard,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },

    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ApiGatewayModule {}
