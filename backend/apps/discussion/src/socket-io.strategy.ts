import { CustomTransportStrategy, Server } from '@nestjs/microservices';
import { Socket } from 'socket.io-client';
import type { Socket as SocketType } from 'socket.io-client';

export class SocketIoClientStrategy
  extends Server
  implements CustomTransportStrategy
{
  constructor(private client: Socket) {
    super();
  }

  on<
    EventKey extends string = string,
    EventCallback extends Function = Function,
  >(event: EventKey, callback: EventCallback) {
    throw new Error('Method not implemented.');
  }
  unwrap<T>(): T {
    throw new Error('Method not implemented.');
  }

  /**
   * This method is triggered when you run "app.listen()".
   */
  listen(callback: () => void) {
    console.log('Listening');
    this.client.on('connection', () => {
      console.log('connect');
    });
    this.client.on('hello', (arg, cb) => {
      console.log(arg);
      cb('got it');
    });
    this.client.on('error', (error: any) => {
      console.log(error);
    });

    this.messageHandlers.forEach((handler, pattern) => {
      this.client.on(pattern, (data: any) => {
        handler(data, this.client);
      });
    });

    callback();
  }

  /**
   * This method is triggered on application shutdown.
   */
  close() {
    this.client.disconnect();
  }
}
