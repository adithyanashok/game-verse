import { NestFactory } from '@nestjs/core';
import { DiscussionModule } from './discussion.module';
import { Transport } from '@nestjs/microservices';
import { IoAdapter } from '@nestjs/platform-socket.io';

// import { SocketIoClientProvider } from './socket-io.provider';

async function bootstrap() {
  const app = await NestFactory.create(DiscussionModule);

  app.useWebSocketAdapter(new IoAdapter(app));

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 8000,
    },
  });

  await app.startAllMicroservices();

  const wsPort = process.env.DISCUSSION_WS_PORT || 8001;
  await app.listen(wsPort, '0.0.0.0');

  console.log(`Discussion WS running on port ${wsPort}`);
}
bootstrap();
