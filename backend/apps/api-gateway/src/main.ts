import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import { Request, Response, NextFunction } from 'express';
import { MICROSERVICE_CONFIG } from 'libs/common/src';

async function bootstrap() {
  console.log('Starting API Gateway...');
  console.log('Environment REVIEW_HOST:', process.env.REVIEW_HOST);
  console.log(
    'Microservice Config:',
    JSON.stringify(MICROSERVICE_CONFIG, null, 2),
  );

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
    origin: ['http://localhost:5173', 'http://192.168.1.103:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.use(cookieParser());

  app.use(
    helmet({
      frameguard: { action: 'deny' },
      noSniff: true,
      hidePoweredBy: true,
      hsts:
        process.env.NODE_ENV === 'production'
          ? {
              maxAge: 31536000,
              includeSubDomains: true,
              preload: true,
            }
          : false,
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'blob:'],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
        },
      },
    }),
  );

  // app.use(csurf({ cookie: true }));

  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   const token = req.csrfToken();
  //   res.cookie('XSRF-TOKEN', token, {
  //     httpOnly: false,
  //     secure: process.env.NODE_ENV === 'production',
  //     sameSite: 'strict',
  //   });
  //   next();
  // });

  app.setGlobalPrefix('api');

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
