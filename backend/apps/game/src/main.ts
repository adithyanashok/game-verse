import { NestFactory } from '@nestjs/core';
import { GameModule } from './game.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import { MICROSERVICE_CONFIG } from 'libs/common/src/constants/microservice.constants';
import { ExceptionFilter } from 'libs/common/src';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    GameModule,
    {
      transport: Transport.TCP,
      options: {
        port: MICROSERVICE_CONFIG.GAME_SERVICE.port,
        host: '0.0.0.0',
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new ExceptionFilter());
  await app.listen();
}
bootstrap();
