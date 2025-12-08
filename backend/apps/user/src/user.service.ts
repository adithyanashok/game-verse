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
      let hashed: string;
      let user: CreateUserDto;
      if (dto.password) {
        hashed = await bcrypt.hash(dto.password, salt);
        user = { ...dto, password: hashed };
      } else {
        user = { ...dto };
      }

      const newUser = this.userRepository.create(user);

      const savedUser = await this.userRepository.save(newUser);
      delete savedUser.password;
      return savedUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOneBy({ email });
      console.log('getUserByEmail: ', user);
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

  public async getUserProfile(id: number, viewerId?: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        relations: ['followers', 'following'],
      });
      if (!user) {
        throw new RpcException(`User with id "${id}" does not exist`);
      }

      const followersCount = user.followers?.length ?? 0;
      const followingCount = user.following?.length ?? 0;
      const isFollowing =
        user.followers?.some((follower) => {
          return follower.id === viewerId;
        }) ?? false;

      return new ApiResponse(true, 'User profile fetched', {
        name: user.name,
        email: user.email,
        bio: user.bio,
        id: user.id,
        followersCount,
        followingCount,
        isFollowing,
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  public async followUser(followerId: number, targetUserId: number) {
    try {
      if (followerId === targetUserId) {
        throw new RpcException({
          status: 400,
          message: 'Users cannot follow themselves',
        });
      }

      const follower = await this.userRepository.findOne({
        where: { id: followerId },
        relations: ['following'],
      });
      if (!follower) {
        throw new RpcException(`User with id "${followerId}" does not exist`);
      }

      const targetUser = await this.userRepository.findOneBy({
        id: targetUserId,
      });
      if (!targetUser) {
        throw new RpcException(`User with id "${targetUserId}" does not exist`);
      }

      const alreadyFollowing = follower.following?.some(
        (user) => user.id === targetUserId,
      );

      if (alreadyFollowing) {
        return new ApiResponse(true, 'Already following this user', {
          isFollowing: true,
        });
      }

      follower.following = [...(follower.following ?? []), targetUser];
      await this.userRepository.save(follower);

      return new ApiResponse(true, 'User followed successfully', {
        isFollowing: true,
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  public async unfollowUser(followerId: number, targetUserId: number) {
    try {
      const follower = await this.userRepository.findOne({
        where: { id: followerId },
        relations: ['following'],
      });
      if (!follower) {
        throw new RpcException(`User with id "${followerId}" does not exist`);
      }

      const targetUser = await this.userRepository.findOneBy({
        id: targetUserId,
      });
      if (!targetUser) {
        throw new RpcException(`User with id "${targetUserId}" does not exist`);
      }

      const isFollowing = follower.following?.some(
        (user) => user.id === targetUserId,
      );

      if (!isFollowing) {
        return new ApiResponse(true, 'User is not being followed', {
          isFollowing: false,
        });
      }

      follower.following = follower.following.filter(
        (user) => user.id !== targetUserId,
      );
      await this.userRepository.save(follower);

      return new ApiResponse(true, 'User unfollowed successfully', {
        isFollowing: false,
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  // Get Top Reviewers
  public async getTopReviewers() {
    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .leftJoin('user.followers', 'followers')
        .loadRelationCountAndMap('user.followerCount', 'user.followers')
        .orderBy('user.followerCount', 'DESC')
        .getMany();

      return new ApiResponse(true, 'Users Fetched successfully', users);
    } catch (error) {
      console.log(error);
      throw new RpcException(error);
    }
  }

  public async findOneByGoogleId(googleId: string) {
    try {
      const user = await this.userRepository.findOneBy({ googleId });
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
