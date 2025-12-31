import { Request } from 'express';
import { Role } from '../enums/role.enum';

export interface User {
  id: number;
  email: string;
  // password: string;
  role?: Role;
}

export interface AuthenticatedRequest extends Request {
  user?: User;
  // cookies: Record<string, string | undefined>;
}
