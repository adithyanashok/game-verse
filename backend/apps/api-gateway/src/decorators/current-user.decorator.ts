import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../common/request';
import { AuthenticatedRequest } from '../guards/jwt-auth.guard';

// interface AuthenticatedRequest extends Request {
//   user?: User;
// }

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User | undefined => {
    console.log('REQUEST PARAMETER createParamDecorator');

    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
