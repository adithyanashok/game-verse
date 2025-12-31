import { Controller } from '@nestjs/common';
import { DiscussionService } from './discussion.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateDiscussionDto, MessagePatterns } from 'libs/common/src';

@Controller('discussion')
export class DiscussionController {
  constructor(private readonly discussionService: DiscussionService) {}

  @MessagePattern(MessagePatterns.CREATE_DISCUSSION)
  public async createDiscussion(
    @Payload() payload: CreateDiscussionDto & { userId: number },
  ) {
    return this.discussionService.createDiscussion(payload, payload.userId);
  }

  @MessagePattern(MessagePatterns.GET_DISCUSSION)
  public async getDiscussion(@Payload() payload: { id: number }) {
    console.log('payload ', payload);
    return this.discussionService.getDiscussion(payload.id);
  }

  @MessagePattern(MessagePatterns.GET_ALL_DISCUSSION)
  public async getDiscussions() {
    return this.discussionService.getDiscussions();
  }
}
