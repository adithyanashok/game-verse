import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MICROSERVICE_CONFIG } from 'libs/common/src';
import { ConfigService } from '@nestjs/config';
import { S3Client } from '@aws-sdk/client-s3';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: MICROSERVICE_CONFIG.USER_SERVICE.port,
      },
    },
  );

  const configService = app.get(ConfigService);

  const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: configService.get<string>('awsAccessKeyId') || '',
      secretAccessKey: configService.get<string>('awsSecretAccessKey') || '',
    },
  });

  await app.listen();
}
bootstrap();
