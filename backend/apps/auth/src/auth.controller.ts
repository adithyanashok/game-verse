import { Controller, Post, Body, Inject } from '@nestjs/common';
import {
  ClientProxy,
  MessagePattern,
  RpcException,
} from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { ApiResponse, CreateUserDto, MessagePatterns } from 'libs/common/src';
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
      throw new RpcException(error?.message || 'Signup failed');
    }
  }

  // @Post('login')
  // async login(@Body() dto: LoginUserDto) {
  //   const user = await this.userClient
  //     .send('get_user_by_email', dto.email)
  //     .toPromise();

  //   return this.authService.validateUserAndLogin(user, dto.password);
  // }
}
