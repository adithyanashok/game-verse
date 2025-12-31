import { HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class ErrorHandler {
  static handle(error: any, customText: string): never {
    console.error('[RPC ERROR]', error);

    if (error instanceof RpcException) {
      throw error;
    }

    if (error instanceof HttpException) {
      throw new RpcException(error.getResponse());
    }

    if (error instanceof Error) {
      throw new RpcException(error.message);
    }

    if (typeof error === 'object' && error && 'message' in error) {
      const message = (error as Record<string, unknown>).message;
      throw new RpcException(
        typeof message === 'string'
          ? message
          : 'Unknown error occurred: ' + customText,
      );
    }

    throw new RpcException('Unknown error occurred: ' + customText);
  }
}
