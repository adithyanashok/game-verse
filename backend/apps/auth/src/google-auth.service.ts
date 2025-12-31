import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from './config/jwt.config';
import {
  ApiResponse,
  GoogleUserDto,
  MessagePatterns,
  ServiceName,
  User,
} from 'libs/common/src';
import { lastValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
  private oathClient: OAuth2Client;

  constructor(
    /**
     * Jwt Configuration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(ServiceName.USER) private readonly userClient: ClientProxy,

    private readonly authService: AuthService,
  ) {}
  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oathClient = new OAuth2Client(clientId, clientSecret);
  }

  public async googleAuth(googleUserDto: GoogleUserDto) {
    try {
      const ticket = await this.oathClient.verifyIdToken({
        idToken: googleUserDto.token,
      });

      const tokenPayload = ticket.getPayload();

      const user = await lastValueFrom(
        this.userClient.send<User>(
          MessagePatterns.USER_FIND_BY_GOOGLE_ID,
          tokenPayload?.sub,
        ),
      );

      if (user) {
        const tokens = await this.authService.generateTokens(user);
        return new ApiResponse(true, 'Authenticated', { user, ...tokens });
      }

      const newUser = await lastValueFrom(
        this.userClient.send<User>(MessagePatterns.AUTH_SIGNUP, {
          email: tokenPayload?.email,
          name: tokenPayload?.given_name,
        }),
      );

      return new ApiResponse(true, 'Authenticated', newUser);
    } catch (error) {
      if (error instanceof Error) {
        throw new RpcException(error.message);
      }
      throw new RpcException('Failed Google Authentication');
    }
  }
}
