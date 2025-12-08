import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CONFIG } from 'libs/common/src';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        host: MICROSERVICE_CONFIG.USER_SERVICE.host,
        port: MICROSERVICE_CONFIG.USER_SERVICE.port,
      },
    },
  );

  await app.listen();
}
bootstrap();
