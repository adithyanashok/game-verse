import { Injectable } from '@nestjs/common';
import { Discussion } from './entities/Discussion';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ApiResponse,
  CreateDiscussionDto,
  ErrorHandler,
} from 'libs/common/src';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { Message } from './entities/Message';
import { DiscussionBlockList } from './entities/DiscussionBlockList';

@Injectable()
export class DiscussionService {
  constructor(
    @InjectRepository(Discussion)
    private readonly repo: Repository<Discussion>,
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
    @InjectRepository(DiscussionBlockList)
    private readonly blockRepo: Repository<DiscussionBlockList>,
  ) {}

  public async createDiscussion(data: CreateDiscussionDto, adminId: number) {
    try {
      const discussion = this.repo.create({ ...data, adminId });
      const savedDiscussion = await this.repo.save(discussion);
      return new ApiResponse(
        true,
        'Discussion Created Successfully',
        savedDiscussion,
      );
    } catch (error) {
      ErrorHandler.handle(error, 'Create Discussion');
    }
  }

  public async getDiscussions() {
    try {
      const discussion = await this.repo.find();
      return new ApiResponse(
        true,
        'Discussions Fetched Successfully',
        discussion,
      );
    } catch (error) {
      ErrorHandler.handle(error, 'Get Discussions');
    }
  }

  public async getDiscussion(id: number) {
    try {
      const discussion = await this.repo.findOneBy({ id });
      if (!discussion) {
        throw new RpcException('Discussion Not Found');
      }
      return new ApiResponse(
        true,
        'Discussion Fetched Successfully',
        discussion,
      );
    } catch (error) {
      ErrorHandler.handle(error, 'Get Discussion');
    }
  }

  public async saveMessage(
    discussionId: number,
    senderId: number,
    content: string,
  ) {
    const discussion = await this.repo.findOneBy({ id: discussionId });
    if (!discussion) throw new RpcException('Discussion not found');

    const message = this.messageRepo.create({
      content,
      senderId,
      discussion,
    });
    return await this.messageRepo.save(message);
  }

  public async blockUser(
    discussionId: number,
    userId: number,
    adminId: number,
  ) {
    const discussion = await this.repo.findOneBy({ id: discussionId });
    if (!discussion) throw new RpcException('Discussion not found');

    if (discussion.adminId !== adminId) {
      throw new RpcException('Only admin can block users');
    }

    const block = this.blockRepo.create({ discussion, userId });
    return await this.blockRepo.save(block);
  }

  public async isUserBlocked(discussionId: number, userId: number) {
    const count = await this.blockRepo.count({
      where: { discussion: { id: discussionId }, userId },
    });
    return count > 0;
  }

  public async deleteDiscussion(id: number) {
    try {
      const discussion = await this.repo.findOneBy({ id });
      if (discussion) {
        await this.repo.remove(discussion);
        return new ApiResponse(true, 'Discussion Deleted Successfully');
      }
    } catch (error) {
      ErrorHandler.handle(error, 'Delete Discussion');
    }
  }

  public async endDiscussion(id: number) {
    try {
      const discussion = await this.repo.findOneBy({ id });
      if (discussion) {
        await this.repo.remove(discussion);
        return new ApiResponse(true, 'Discussion Deleted Successfully');
      }
    } catch (error) {
      ErrorHandler.handle(error, 'Delete Discussion');
    }
  }

  public async updateCount(id: number, count: number) {
    try {
      const discussion = await this.repo.findOneBy({ id });
      if (discussion) {
        await this.repo.update(id, { totalMembers: count });
        return new ApiResponse(true, 'Discussion Count Updated Successfully');
      }
    } catch (error) {
      ErrorHandler.handle(error, 'Update Discussion Count');
    }
  }
}
