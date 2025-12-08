import { Body, Controller } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { GoogleUserDto, MessagePatterns } from 'libs/common/src';
import { MessagePattern } from '@nestjs/microservices';

@Controller('google-auth')
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @MessagePattern(MessagePatterns.GOOGLE_AUTH)
  googleAuth(@Body() googleUserDto: GoogleUserDto) {
    return this.googleAuthService.googleAuth(googleUserDto);
  }
}
