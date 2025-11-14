import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../common/request';
import { AuthenticatedRequest } from '../guards/jwt-auth.guard';

// interface AuthenticatedRequest extends Request {
//   user?: User;
// }

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User | undefined => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    console.log('REQUEST PARAMETER createParamDecorator', request.user);
    return request.user;
  },
);
