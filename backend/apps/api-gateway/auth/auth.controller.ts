import {
  Controller,
  Post,
  Body,
  Inject,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiResponse,
  CreateUserDto,
  GoogleUserDto,
  LoginUserDto,
  MessagePatterns,
  ServiceName,
  User,
} from 'libs/common/src';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user?: User;
}
import { firstValueFrom } from 'rxjs';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../src/decorators/public.decorator';

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
  public async signup(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await firstValueFrom(
        this.authClient.send<ApiResponse<AuthResponse>>(
          MessagePatterns.AUTH_SIGNUP,
          createUserDto,
        ),
      );
      if (response.status && response.data?.accessToken) {
        res.cookie('access_token', response.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000,
        });
      }
      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Login
   */
  @Public()
  @Post('login')
  public async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await firstValueFrom(
        this.authClient.send<ApiResponse<AuthResponse>>(
          MessagePatterns.AUTH_SIGNIN,
          loginUserDto,
        ),
      );
      if (response.status && response.data?.accessToken) {
        res.cookie('access_token', response.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000,
        });
      }
      return response;
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
  public async refresh(
    @Body() body: { refreshToken: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await firstValueFrom(
        this.authClient.send<ApiResponse<AuthResponse>>(
          MessagePatterns.AUTH_REFRESH,
          body,
        ),
      );
      if (response.status && response.data?.accessToken) {
        res.cookie('access_token', response.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000,
        });
      }
      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }

  /**
   * Google Auth
   */
  @Public()
  @ApiOperation({
    summary: 'Api for Google Auth',
  })
  @Post('google-auth')
  public async googleAuth(
    @Body() googleTokenDto: GoogleUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<AuthResponse>> {
    try {
      const response = await firstValueFrom(
        this.authClient.send<ApiResponse<AuthResponse>>(
          MessagePatterns.GOOGLE_AUTH,
          googleTokenDto,
        ),
      );
      if (response.status && response.data?.accessToken) {
        res.cookie('access_token', response.data.accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000,
        });
      }
      return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
  }
}
