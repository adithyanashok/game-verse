import { Injectable, BadRequestException, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { RpcException } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class UploadService implements OnModuleInit {
  private s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const region = this.configService.get<string>('appConfig.awsRegion');
    const accessKeyId = this.configService.get<string>(
      'appConfig.awsAccessKeyId',
    );
    const secretAccessKey = this.configService.get<string>(
      'appConfig.awsSecretAccessKey',
    );

    if (!region || !accessKeyId || !secretAccessKey) {
      throw new Error('AWS S3 Configuration is missing');
    }

    this.s3Client = new S3Client({
      region,
      credentials: { accessKeyId, secretAccessKey },
    });
  }

  public async uploadFile(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('File is empty');

    let buffer = file.buffer;
    if (
      buffer &&
      typeof buffer === 'object' &&
      'type' in buffer &&
      buffer['type'] === 'Buffer' &&
      'data' in buffer
    ) {
      const data = (buffer as { data: unknown }).data;
      if (Array.isArray(data)) {
        buffer = Buffer.from(data);
      }
    }

    if (!Buffer.isBuffer(buffer)) {
      throw new BadRequestException('Invalid file buffer');
    }

    const bucketName = this.configService.get<string>(
      'appConfig.awsPublicBucketName',
    );

    const contentLength = buffer.length;
    const key = `profile-images/${uuidv4()}${path.extname(file.originalname)}`;
    const cloudfrontUrl = this.configService.get<string>(
      'appConfig.awsCloudFrontUrl',
    );
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Body: buffer,
        Key: key,
        ContentType: file.mimetype,
        ContentLength: contentLength,
      });

      await this.s3Client.send(command);

      return `${cloudfrontUrl}/${key}`;
    } catch (error) {
      if (error instanceof Error) {
        throw new RpcException(error.message);
      }

      throw new RpcException('Unknown error occurred');
    }
  }
}
