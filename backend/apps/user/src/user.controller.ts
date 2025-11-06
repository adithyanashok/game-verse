import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto, MessagePatterns, UpdateUserDto } from 'libs/common/src';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(MessagePatterns.AUTH_SIGNUP)
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
  public async updateUser(
    @Payload() payload: { dto: UpdateUserDto; userId: number },
  ) {
    return this.userService.updateUser(payload.dto, payload.userId);
  }

  @MessagePattern(MessagePatterns.GET_USER)
  public async getUserProfile(@Payload() payload: { userId: number }) {
    return this.userService.getUserProfile(payload.userId);
  }
}
