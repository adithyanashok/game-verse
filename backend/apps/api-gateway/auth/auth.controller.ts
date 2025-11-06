import {
  Controller,
  Post,
  Body,
  Inject,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserDto,
  LoginUserDto,
  MessagePatterns,
  ServiceName,
} from 'libs/common/src';
import { firstValueFrom } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../src/decorators/public.decorator';
import { RefreshTokenDto } from '../src/dto/refreshToken.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(ServiceName.AUTH) private readonly authClient: ClientProxy,
  ) {}

  /**
   * Signup
   */
  @Public()
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
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Login
   */
  @Public()
  @ApiOperation({
    summary: 'Api for Login',
  })
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
    try {
      return await firstValueFrom(
        this.authClient.send(MessagePatterns.AUTH_SIGNIN, loginUserDto),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * Refresh token
   */
  @Public()
  @ApiOperation({
    summary: 'Api for Refreshing Access Token',
  })
  @Post('refresh')
  public async refresh(@Body() body: RefreshTokenDto): Promise<any> {
    try {
      return await firstValueFrom(
        this.authClient.send(MessagePatterns.AUTH_REFRESH, body),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}
