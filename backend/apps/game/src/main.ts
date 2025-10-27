import { NestFactory } from '@nestjs/core';
import { GameModule } from './game.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { MICROSERVICE_CONFIG } from 'libs/common/src/constants/microservice.constants';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GameModule,
    {
      transport: Transport.TCP,
      options: {
        port: MICROSERVICE_CONFIG.GAME_SERVICE.port,
        host: MICROSERVICE_CONFIG.GAME_SERVICE.host,
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
