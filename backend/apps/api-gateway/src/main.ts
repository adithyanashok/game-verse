import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const config = new DocumentBuilder()
    .setTitle('Gateway Service')
    .setDescription('Gateway API documentation')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .addServer('/api')
    .addTag('gateway')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: false },
    }),
  );
  SwaggerModule.setup('api/docs', app, document);
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
