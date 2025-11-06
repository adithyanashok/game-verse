import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Patch,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MessagePatterns, UpdateUserDto } from 'libs/common/src';
import { firstValueFrom } from 'rxjs';
import { CurrentUser } from '../src/decorators/current-user.decorator';
import type { User } from '../src/guards/jwt-auth.guard';

@ApiBearerAuth()
@Controller()
export class UserController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
  ) {}

  /**
   * Update User
   */
  @ApiOperation({
    summary: 'Update user',
  })
  @Patch('update-user')
  public async signup(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.userClient.send(MessagePatterns.UPDATE_USER, {
          dto: updateUserDto,
          userId: user.id,
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Get User Profile
   */
  @ApiOperation({
    summary: 'Get user Profile',
  })
  @Get('get-user-profile')
  public async getUserProfile(@CurrentUser() user: User): Promise<any> {
    try {
      return await firstValueFrom(
        this.userClient.send(MessagePatterns.GET_USER, {
          userId: user.id,
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
