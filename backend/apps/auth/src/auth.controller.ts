import { Controller, Body, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { AuthService } from './auth.service';
import {
  ApiResponse,
  CreateUserDto,
  LoginUserDto,
  MessagePatterns,
} from 'libs/common/src';
import { lastValueFrom } from 'rxjs';
import { User } from './interfaces/user.interface';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @MessagePattern(MessagePatterns.AUTH_SIGNUP)
  async signup(@Body() dto: CreateUserDto) {
    try {
      const user = await lastValueFrom(
        this.userClient.send<User>(MessagePatterns.AUTH_SIGNUP, dto),
      );
      const tokens = await this.authService.generateTokens(user);

      return new ApiResponse(true, 'Account Created', { user, ...tokens });
    } catch (error) {
      throw new RpcException(
        error instanceof Error ? error.message : 'Signup failed',
      );
    }
  }

  @MessagePattern(MessagePatterns.AUTH_SIGNIN)
  async login(@Body() dto: LoginUserDto) {
    try {
      const user = await this.authService.validateUser(dto.email, dto.password);
      if (!user) {
        throw new RpcException({
          status: 401,
          message: 'Invalid credentials',
        });
      }
      const tokens = await this.authService.generateTokens(user);
      return new ApiResponse(true, 'Login Successful', {
        user,
        ...tokens,
      });
    } catch (error) {
      throw new RpcException(
        error instanceof RpcException
          ? error.getError()
          : { status: 401, message: 'Login failed' },
      );
    }
  }

  @MessagePattern(MessagePatterns.AUTH_VALIDATE)
  async validate(
    @Body() payload: { sub: string | number; email: string; role?: string },
  ) {
    try {
      const user = await this.authService.validateJwtPayload(payload);
      if (!user) {
        throw new RpcException({
          status: 401,
          message: 'Invalid token',
        });
      }
      if (!user.role && payload.role) {
        user.role = payload.role;
      }
      return user;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @MessagePattern(MessagePatterns.AUTH_REFRESH)
  async refresh(@Body() body: { refreshToken: string }) {
    try {
      if (!body?.refreshToken) {
        throw new RpcException({
          status: 400,
          message: 'refreshToken required',
        });
      }
      const user = await this.authService.verifyRefreshToken(body.refreshToken);
      if (!user) {
        throw new RpcException({
          status: 401,
          message: 'Invalid refresh token',
        });
      }
      const tokens = await this.authService.generateTokens(user);
      return new ApiResponse(true, 'Token refreshed', tokens);
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
