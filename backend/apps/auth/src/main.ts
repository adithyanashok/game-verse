import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CONFIG } from 'libs/common/src';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host: MICROSERVICE_CONFIG.AUTH_SERVICE.host,
        port: MICROSERVICE_CONFIG.AUTH_SERVICE.port,
      },
    },
  );
  await app.listen();
}
bootstrap();
