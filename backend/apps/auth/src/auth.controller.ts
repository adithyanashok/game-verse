import { Controller, Body, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import {
  ApiResponse,
  CreateUserDto,
  ErrorHandler,
  LoginUserDto,
  MessagePatterns,
} from 'libs/common/src';
import { lastValueFrom } from 'rxjs';
import { User } from './interfaces/user.interface';

interface JwtPayload {
  sub: string | number;
  email: string;
  role?: string;
}

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  @MessagePattern(MessagePatterns.AUTH_SIGNUP)
  async signup(@Body() dto: CreateUserDto) {
    try {
      const user = await lastValueFrom(
        this.userClient.send<User>(MessagePatterns.AUTH_SIGNUP, dto),
      );
      const tokens = await this.authService.generateTokens(user);

      const newUser = {
        email: user.email,
        role: user.role,
        id: user.id,
      };

      return new ApiResponse(true, 'Account Created', {
        newUser,
        ...tokens,
      });
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
      const newUser = {
        email: user.email,
        role: user.role,
        id: user.id,
      };

      return new ApiResponse(true, 'Login Successful', {
        user: newUser,
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
  async validate(@Payload() data: { token: string }) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(data.token);

      const user = await lastValueFrom(
        this.userClient.send<User>(
          MessagePatterns.USER_FIND_BY_ID,
          payload.sub,
        ),
      );

      if (!user) {
        throw new RpcException({ status: 401, message: 'User not found' });
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: 401,
        message: 'Invalid or expired token',
      });
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
      ErrorHandler.handle(error, 'Unknown Error Occured: Refersh Token');
    }
  }
}
