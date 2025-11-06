import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { RpcException, ClientProxy } from '@nestjs/microservices';
import { ServiceName, MessagePatterns } from 'libs/common/src';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(ServiceName.USER) private readonly userClient: ClientProxy,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const user = await lastValueFrom(
        this.userClient.send<User>(MessagePatterns.USER_FIND_BY_EMAIL, email),
      );
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
      }
      return user;
    } catch {
      return null;
    }
  }

  async validateUserAndLogin(user: User, password: string) {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new RpcException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const role: string = user.role ?? 'user';
    const payload: {
      sub: string | number;
      email: string;
      role: string;
    } = {
      sub: user.id,
      email: user.email,
      role,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }

  async validateJwtPayload(payload: {
    sub: string | number;
    email: string;
    role?: string;
  }) {
    try {
      const user = await lastValueFrom(
        this.userClient.send<User>(
          MessagePatterns.USER_FIND_BY_ID,
          payload.sub,
        ),
      );
      return user;
    } catch {
      return null;
    }
  }
}
