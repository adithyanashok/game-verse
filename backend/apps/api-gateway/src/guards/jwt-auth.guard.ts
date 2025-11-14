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

export interface User {
  id: number;
  email: string;
  // password: string;
  role?: string;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
}

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

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.parseToken(token);
      const user = await firstValueFrom<User>(
        this.authClient.send<User>(MessagePatterns.AUTH_VALIDATE, payload),
      );

      if (!user || !user.id || !user.email) {
        throw new UnauthorizedException('Invalid token');
      }

      // Ensure role is included from token payload if not in user object
      if (!user.role && payload.role) {
        user.role = payload.role;
      }

      const extractedUser: User = {
        id: user.id,
        role: user.role,
        email: user.email,
      };

      request.user = extractedUser;
      console.log('JWT GUARD', request.user);
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractTokenFromHeader(
    request: AuthenticatedRequest,
  ): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader || typeof authHeader !== 'string') {
      return undefined;
    }
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
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
