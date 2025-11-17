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

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  public async followUser(@Payload() payload: FollowUserDto): Promise<any> {
    return this.userService.followUser(
      payload.followerId,
      payload.targetUserId,
    );
  }

  @MessagePattern(MessagePatterns.USER_UNFOLLOW)
  public async unfollowUser(@Payload() payload: FollowUserDto) {
    return this.userService.unfollowUser(
      payload.followerId,
      payload.targetUserId,
    );
  }

  @MessagePattern(MessagePatterns.GET_TOP_REVIEWERS)
  public async getTopReviewers() {
    console.log('getTopReviewers');
    return this.userService.getTopReviewers();
  }
}
