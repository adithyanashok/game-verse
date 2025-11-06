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
      const accessToken = await this.authService.generateToken(user);

      return new ApiResponse(true, 'Account Created', { user, accessToken });
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
      const accessToken = await this.authService.generateToken(user);
      return new ApiResponse(true, 'Login Successful', {
        user,
        accessToken,
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
      throw new RpcException(
        error instanceof RpcException
          ? error.getError()
          : { status: 401, message: 'Validation failed' },
      );
    }
  }
}
