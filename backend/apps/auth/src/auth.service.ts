import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUserAndLogin(user: User, password: string) {
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new RpcException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  async generateToken(user: User) {
    const payload: { sub: string | number; email: string } = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return accessToken;
  }
}
