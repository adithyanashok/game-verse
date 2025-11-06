import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ApiResponse, CreateUserDto, UpdateUserDto } from 'libs/common/src';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(dto: CreateUserDto) {
    try {
      const existingUser = await this.userRepository.findOneBy({
        email: dto.email,
      });

      if (existingUser) {
        throw new RpcException({
          status: 400,
          message: 'User with this email already exists',
        });
      }

      const salt = await bcrypt.genSalt(10);

      const hashed = await bcrypt.hash(dto.password, salt);
      const user = { ...dto, password: hashed };

      const newUser = this.userRepository.create(user);

      const savedUser = await this.userRepository.save(newUser);

      return savedUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });

      if (!user) {
        throw new RpcException(`User with email "${email}" does not exist`);
      }

      return user;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  public async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });

      if (!user) {
        throw new RpcException(`User with id "${id}" does not exist`);
      }

      return user;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  public async updateUser(updateUserDto: UpdateUserDto, userId: number) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user) {
        throw new RpcException(`User with id "${userId}" does not exist`);
      }

      user.bio = updateUserDto.bio ?? user.bio;
      user.name = updateUserDto.name ?? user.name;

      const updatedUser = await this.userRepository.save(user);

      return new ApiResponse(true, 'User updated', updatedUser);
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  public async getUserProfile(id: number) {
    try {
      const user = await this.userRepository.findOneBy({ id });
      console.log(user);
      if (!user) {
        throw new RpcException(`User with id "${id}" does not exist`);
      }

      return new ApiResponse(true, 'User profile fetched', {
        name: user.name,
        email: user.email,
        bio: user.bio,
        id: user.id,
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
