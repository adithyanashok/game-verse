import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';
import { ServiceName, MessagePatterns } from 'libs/common/src';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { User, AuthenticatedRequest } from '../common/request';

interface JwtPayload {
  sub: string | number;
  email: string;
  role?: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(ServiceName.AUTH) private readonly authClient: ClientProxy,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const user = await firstValueFrom<User>(
        this.authClient.send(MessagePatterns.AUTH_VALIDATE, { token }),
      );

      request.user = {
        id: user.id,
        email: user.email,
        role: user.role,
      };

      return true;
    } catch (err) {
      console.error('Auth validation failed', err);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractToken(request: AuthenticatedRequest): string | undefined {
    // 1. Check cookies
    if (request.cookies && request.cookies['access_token']) {
      return request.cookies['access_token'];
    }

    // 2. Check Authorization header
    const authHeader = request.headers.authorization;
    if (authHeader && typeof authHeader === 'string') {
      const [type, token] = authHeader.split(' ');
      return type === 'Bearer' ? token : undefined;
    }

    return undefined;
  }

  private parseToken(token: string): JwtPayload {
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) {
        throw new Error('Invalid token format');
      }
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        Buffer.from(base64, 'base64')
          .toString()
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join(''),
      );
      const payload = JSON.parse(jsonPayload) as JwtPayload;
      if (!payload.sub || !payload.email) {
        throw new Error('Invalid token payload');
      }
      return {
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
      };
    } catch {
      throw new UnauthorizedException('Invalid token format');
    }
  }
}
