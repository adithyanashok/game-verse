import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Socket, io } from 'socket.io-client';

@Injectable()
export class SocketIoClientProvider {
  private socket: Socket;

  private connect() {
    this.socket = io('http://localhost:5173/');
    return this.socket;
  }

  getSocket = () => {
    if (!this.socket) {
      return this.connect();
    }
    return this.socket;
  };
}
