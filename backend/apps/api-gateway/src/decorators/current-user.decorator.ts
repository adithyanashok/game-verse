import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User, AuthenticatedRequest } from '../common/request';

// interface AuthenticatedRequest extends Request {
//   user?: User;
// }

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User | undefined => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    return request.user;
  },
);
