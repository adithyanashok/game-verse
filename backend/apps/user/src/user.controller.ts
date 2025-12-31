import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import {
  CreateUserDto,
  FollowUserDto,
  MessagePatterns,
  UpdateUserDto,
} from 'libs/common/src';
import { UploadService } from './upload/upload.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadService: UploadService,
  ) {}

  @MessagePattern(MessagePatterns.AUTH_SIGNUP)
  @UseInterceptors(ClassSerializerInterceptor)
  public async createUser(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern(MessagePatterns.USER_FIND_BY_EMAIL)
  public async getUserByEmail(@Payload() email: string) {
    return this.userService.getUserByEmail(email);
  }

  @MessagePattern(MessagePatterns.USER_FIND_BY_ID)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getUserById(@Payload() id: number) {
    return this.userService.getUserById(id);
  }

  @MessagePattern(MessagePatterns.UPDATE_USER)
  @UseInterceptors(ClassSerializerInterceptor)
  public async updateUser(
    @Payload() payload: { dto: UpdateUserDto; userId: number },
  ) {
    return this.userService.updateUser(payload.dto, payload.userId);
  }

  @MessagePattern(MessagePatterns.GET_USER)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getUserProfile(
    @Payload() payload: { userId: number; viewerId: number },
  ) {
    return this.userService.getUserProfile(payload.userId, payload.viewerId);
  }

  @MessagePattern(MessagePatterns.USER_FOLLOW)
  @UseInterceptors(ClassSerializerInterceptor)
  public async followUser(@Payload() payload: FollowUserDto): Promise<any> {
    return this.userService.followUser(
      payload.followerId,
      payload.targetUserId,
    );
  }

  @MessagePattern(MessagePatterns.USER_UNFOLLOW)
  @UseInterceptors(ClassSerializerInterceptor)
  public async unfollowUser(@Payload() payload: FollowUserDto) {
    return this.userService.unfollowUser(
      payload.followerId,
      payload.targetUserId,
    );
  }

  @MessagePattern(MessagePatterns.GET_TOP_REVIEWERS)
  @UseInterceptors(ClassSerializerInterceptor)
  public async getTopReviewers(@Payload() payload: { userId?: number | null }) {
    return this.userService.getTopReviewers(payload.userId);
  }

  @MessagePattern(MessagePatterns.USER_FIND_BY_GOOGLE_ID)
  @UseInterceptors(ClassSerializerInterceptor)
  public getUserByGoogleId(@Payload() googleId: string) {
    return this.userService.findOneByGoogleId(googleId);
  }

  @MessagePattern(MessagePatterns.USER_PROFILE_IMAGE)
  @UseInterceptors(ClassSerializerInterceptor)
  public async uploadFile(
    @Payload() payload: { userId: number; file: Express.Multer.File },
  ) {
    const imageUrl = await this.uploadService.uploadFile(payload.file);
    return await this.userService.updateProfileImage(imageUrl, payload.userId);
  }

  @MessagePattern(MessagePatterns.USER_FIND_MANY_BY_USER_ID)
  @UseInterceptors(ClassSerializerInterceptor)
  public findManyByUserId(@Payload() userIds: number[]) {
    return this.userService.findManyByUserId(userIds);
  }

  @MessagePattern(MessagePatterns.USER_FIND_MANY_USERNAME_BY_USER_ID)
  @UseInterceptors(ClassSerializerInterceptor)
  public findManyUsernameByUserId(@Payload() userIds: number[]) {
    return this.userService.findManyUsernameByUserId(userIds);
  }

  @MessagePattern(MessagePatterns.GET_FOLLOWINGS)
  public getFollowings(@Payload() payload: { userId: number }) {
    return this.userService.getFollowings(payload.userId);
  }
}
