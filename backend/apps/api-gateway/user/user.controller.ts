import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MessagePatterns, UpdateUserDto } from 'libs/common/src';
import { firstValueFrom } from 'rxjs';
import { CurrentUser } from '../src/decorators/current-user.decorator';
import type { User } from '../src/guards/jwt-auth.guard';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
  ) {}

  /**
   * Update User
   */
  @ApiOperation({ summary: 'Update user' })
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
      const message =
        error instanceof Error ? error.message : 'Failed to update user';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Get User Profile
   */
  @ApiOperation({ summary: 'Get user profile' })
  @Get('get-user-profile')
  public async getUserProfile(@CurrentUser() user: User): Promise<any> {
    try {
      return await firstValueFrom(
        this.userClient.send(MessagePatterns.GET_USER, {
          userId: user.id,
          viewerId: user.id,
        }),
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch profile';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Follow user
   */
  @ApiOperation({ summary: 'Follow another user' })
  @Post('/:targetUserId/follow')
  public async followUser(
    @CurrentUser() user: User,
    @Param('targetUserId', ParseIntPipe) targetUserId: number,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.userClient.send(MessagePatterns.USER_FOLLOW, {
          followerId: user.id,
          targetUserId,
        }),
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to follow user';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * Get Top Reviewers
   */
  @ApiOperation({ summary: 'Api to Get Top Reviewers' })
  @Get('get-top-reviewers')
  public async getTopReviewers(): Promise<any> {
    console.log('get-user-reviewers');
    try {
      return await firstValueFrom(
        this.userClient.send(MessagePatterns.GET_TOP_REVIEWERS, { limit: 1 }),
      );
    } catch (error) {
      console.log(error);
      const message =
        error instanceof Error ? error.message : 'Failed to fetch users';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Unfollow user
   */
  @ApiOperation({ summary: 'Unfollow a user' })
  @Delete('/:targetUserId/follow')
  public async unfollowUser(
    @CurrentUser() user: User,
    @Param('targetUserId', ParseIntPipe) targetUserId: number,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.userClient.send(MessagePatterns.USER_UNFOLLOW, {
          followerId: user.id,
          targetUserId,
        }),
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to unfollow user';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Get another user's profile
   */
  @ApiOperation({ summary: 'Get user profile by id' })
  @Get('/:targetUserId')
  public async getUserProfileById(
    @CurrentUser() user: User,
    @Param('targetUserId', ParseIntPipe) targetUserId: number,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.userClient.send(MessagePatterns.GET_USER, {
          userId: targetUserId,
          viewerId: user.id,
        }),
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch user profile';
      throw new HttpException(message, HttpStatus.BAD_REQUEST);
    }
  }
}
