import { NestFactory } from '@nestjs/core';
import { DiscussionModule } from './discussion.module';
import { Transport } from '@nestjs/microservices';
import { MICROSERVICE_CONFIG } from 'libs/common/src';
import { IoAdapter } from '@nestjs/platform-socket.io';

// import { SocketIoClientProvider } from './socket-io.provider';

async function bootstrap() {
  const app = await NestFactory.create(DiscussionModule);
  // const socketIoClientProvider = app.get<SocketIoClientProvider>(
  //   SocketIoClientProvider,
  // );

  // app.connectMicroservice<MicroserviceOptions>({
  //   strategy: new SocketIoClientStrategy(socketIoClientProvider.getSocket()),
  // });

  app.useWebSocketAdapter(new IoAdapter(app));

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: MICROSERVICE_CONFIG.DISCUSSION_SERVICE.host,
      port: MICROSERVICE_CONFIG.DISCUSSION_SERVICE.port,
    },
  });

  await app.startAllMicroservices();

  await app.listen(8000);
}
bootstrap();
