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

  const port = process.env.DISCUSSION_WS_PORT || 8000;
  await app.listen(port, '0.0.0.0');
  console.log(`Discussion WebSocket server running on port ${port}`);
}
bootstrap();
