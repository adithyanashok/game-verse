import { NestFactory, Reflector } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CONFIG } from 'libs/common/src';
import { ClassSerializerInterceptor } from '@nestjs/common';

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
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen();
}
bootstrap();
