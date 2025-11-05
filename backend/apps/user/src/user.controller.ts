import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto, MessagePatterns } from 'libs/common/src';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(MessagePatterns.AUTH_SIGNUP)
  public async createUser(@Payload() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @MessagePattern(MessagePatterns.AUTH_SIGNIN)
  public async getUserByEmail(@Payload() email: string) {
    return this.userService.getUserByEmail(email);
  }
}
