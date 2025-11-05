import {
  Controller,
  Post,
  Body,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto, MessagePatterns } from 'libs/common/src';
import { firstValueFrom } from 'rxjs';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  /**
   * Signup
   */
  @ApiOperation({
    summary: 'Api for Signup',
  })
  @Post('signup')
  public async signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    try {
      return await firstValueFrom(
        this.authClient.send(MessagePatterns.AUTH_SIGNUP, createUserDto),
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
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
