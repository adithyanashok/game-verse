import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiBearerAuth, ApiHeaders, ApiOperation } from '@nestjs/swagger';
import { MessagePatterns, UpdateUserDto, type User } from 'libs/common/src';
import { firstValueFrom } from 'rxjs';
import { CurrentUser } from '../src/decorators/current-user.decorator';

import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Public } from '../src/decorators/public.decorator';

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

  @ApiOperation({ summary: 'Get followings' })
  @Get('/followings')
  public async getFollowings(@CurrentUser() user: User): Promise<any> {
    try {
      console.log('user ', user);
      return await firstValueFrom(
        this.userClient.send(MessagePatterns.GET_FOLLOWINGS, {
          userId: user.id,
        }),
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to fetch followings';
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
  @Public()
  @Get('get-top-reviewers')
  public async getTopReviewers(
    @CurrentUser() user?: User | null,
  ): Promise<any> {
    try {
      console.log('FIRST');
      return await firstValueFrom(
        this.userClient.send(MessagePatterns.GET_TOP_REVIEWERS, {
          userId: user?.id,
        }),
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

  /**
   * Upload image
   */
  @UseInterceptors(FileInterceptor('file', { storage: multer.memoryStorage() }))
  @ApiHeaders([
    { name: 'Content-Type', description: 'multipart/form-data' },
    { name: 'Authorization', description: 'Bearer Tokens' },
  ])
  @ApiOperation({ summary: 'Upload User Image' })
  @Post('/upload')
  public async uploadUserImage(
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.userClient.send(MessagePatterns.USER_PROFILE_IMAGE, {
          userId: user.id,
          file: file,
        }),
      );
    } catch (error) {
      if (error instanceof RpcException) {
        throw new BadRequestException(error.getError());
      }

      throw new InternalServerErrorException('Microservice failed');
    }
  }
}
