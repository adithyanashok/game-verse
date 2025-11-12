import { NestFactory, Reflector } from '@nestjs/core';
import { ReviewModule } from './review.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CONFIG } from 'libs/common/src';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ReviewModule,
    {
      transport: Transport.TCP,
      options: {
        host: MICROSERVICE_CONFIG.REVIEW_SERVICE.host,
        port: MICROSERVICE_CONFIG.REVIEW_SERVICE.port,
      },
    },
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen();
}
bootstrap();
