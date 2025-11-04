import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCommentDto, MessagePatterns } from 'libs/common/src';

@Controller('comment')
export class CommentController {
  constructor(
    /**
     * Inject Comment Service
     */
    private readonly commentService: CommentService,
  ) {}

  @MessagePattern(MessagePatterns.COMMENT_REVIEWS)
  public async addComment(@Payload() payload: CreateCommentDto) {
    return this.commentService.createComment(payload);
  }
}
