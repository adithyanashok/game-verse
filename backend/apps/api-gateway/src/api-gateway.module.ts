import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ServiceName } from 'libs/common/src';
import { GameController } from '../game/game.controller';
import { MICROSERVICE_CONFIG } from 'libs/common/src/constants/microservice.constants';
import { ReviewController } from '../review/review.controller';
import { AuthController } from '../auth/auth.controller';

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
      {
        name: ServiceName.REVIEW,
        transport: Transport.TCP,
        options: {
          host: MICROSERVICE_CONFIG.REVIEW_SERVICE.host,
          port: MICROSERVICE_CONFIG.REVIEW_SERVICE.port,
        },
      },
      {
        name: ServiceName.AUTH,
        transport: Transport.TCP,
        options: {
          host: MICROSERVICE_CONFIG.AUTH_SERVICE.host,
          port: MICROSERVICE_CONFIG.AUTH_SERVICE.port,
        },
      },
    ]),
  ],
  controllers: [
    ApiGatewayController,
    GameController,
    ReviewController,
    AuthController,
  ],
  providers: [ApiGatewayService],
})
export class ApiGatewayModule {}
