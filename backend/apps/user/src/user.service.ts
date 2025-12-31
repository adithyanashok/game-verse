import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  ApiResponse,
  CreateUserDto,
  ErrorHandler,
  UpdateUserDto,
} from 'libs/common/src';
import { In, Repository } from 'typeorm';
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
      ErrorHandler.handle(error, 'Create User');
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

      ErrorHandler.handle(error, 'Get User By Email');
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
      ErrorHandler.handle(error, 'Get User By Id');
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

      ErrorHandler.handle(error, 'Update User');
    }
  }

  public async getUserProfile(id: number, viewerId?: number) {
    try {
      const query = this.userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id })
        .loadRelationCountAndMap('user.followerCount', 'user.followers')
        .loadRelationCountAndMap('user.followingCount', 'user.following');

      const user = await query.getOne();

      if (!user) {
        throw new RpcException(`User with id "${id}" does not exist`);
      }

      let isFollowing = false;
      if (viewerId) {
        const followCheck = await this.userRepository
          .createQueryBuilder('user')
          .relation('followers')
          .of(id)
          .loadMany();

        isFollowing =
          (await this.userRepository
            .createQueryBuilder('user')
            .innerJoin(
              'user.followers',
              'follower',
              'follower.id = :viewerId',
              { viewerId },
            )
            .where('user.id = :id', { id })
            .getCount()) > 0;
      }

      return new ApiResponse(true, 'User profile fetched', {
        id: user.id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
        followersCount: user.followerCount,
        followingCount: user.followingCount,
        isFollowing,
      });
    } catch (error) {
      console.error(error);
      ErrorHandler.handle(error, 'Get User Profile');
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
      console.log(follower);
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
      follower.followingCount = follower.followingCount + 1;
      await this.userRepository.save(follower);

      return new ApiResponse(true, 'User followed successfully', {
        isFollowing: true,
      });
    } catch (error) {
      console.log(error);

      ErrorHandler.handle(error, 'Follow User');
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
      follower.followingCount = follower.followingCount - 1;

      await this.userRepository.save(follower);

      return new ApiResponse(true, 'User unfollowed successfully', {
        isFollowing: false,
      });
    } catch (error) {
      console.log(error);

      ErrorHandler.handle(error, 'Unfollow User');
    }
  }

  // Get Top Reviewers
  public async getTopReviewers(userId?: number | null) {
    try {
      const users = await this.userRepository
        .createQueryBuilder('user')
        .leftJoin('user.followers', 'followers')
        .loadRelationCountAndMap('user.followerCount', 'user.followers')
        .orderBy('user.followerCount', 'DESC')
        .getMany();

      console.log('filteredUser');
      const filteredUser = users.filter((user) => {
        return user.id !== userId;
      });

      return new ApiResponse(
        true,
        'Users Fetched successfully',
        userId ? filteredUser : users,
      );
    } catch (error) {
      console.log(error);
      ErrorHandler.handle(error, 'Get Top Reviewers');
    }
  }

  public async findOneByGoogleId(googleId: string) {
    try {
      const user = await this.userRepository.findOneBy({ googleId });
      console.log(user);
      return user;
    } catch (error) {
      console.log(error);
      ErrorHandler.handle(error, 'Find One By Google Id');
    }
  }

  public async updateProfileImage(imageUrl: string, userId: number) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });

      if (!user) {
        throw new RpcException(`User with id "${userId}" does not exist`);
      }

      user.profileImage = imageUrl;

      const updatedUser = await this.userRepository.save(user);

      return new ApiResponse(true, 'User Profile Image Updated', updatedUser);
    } catch (error) {
      console.log(error);
      ErrorHandler.handle(error, 'Update Profile Image');
    }
  }

  public async findManyByUserId(userIds: number[]) {
    try {
      const users = await this.userRepository.find({
        where: { id: In(userIds) },
      });

      return users;
    } catch (error) {
      console.log(error);
      ErrorHandler.handle(error, 'Find Many By User Id');
    }
  }

  public async findManyUsernameByUserId(userIds: number[]) {
    try {
      const users = await this.userRepository.find({
        where: { id: In(userIds) },
        select: ['name', 'id', 'profileImage'],
      });

      return users;
    } catch (error) {
      console.log(error);
      ErrorHandler.handle(error, 'Find Many By Username Id');
    }
  }

  public async getFollowings(
    userId: number,
    limit: number = 10,
    page: number = 1,
  ) {
    try {
      const ids = await this.userRepository.find({
        where: { followers: { id: userId } },
        select: ['id'],
        take: limit,
        skip: ((page ?? 1) - 1) * (limit ?? 20),
      });

      const i = ids.map((i) => i.id);

      return i;
    } catch (error) {
      console.log(error);
      ErrorHandler.handle(error, 'Find Many By Username Id');
    }
  }
}
