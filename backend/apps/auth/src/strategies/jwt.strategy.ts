import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { User } from '../interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secret',
    });
  }

  async validate(payload: {
    sub: string | number;
    email: string;
    role?: string;
  }): Promise<User | null> {
    const user = await this.authService.validateJwtPayload(payload);
    if (!user) {
      return null;
    }
    if (!user.role && payload.role) {
      user.role = payload.role;
    }
    return user;
  }
}
