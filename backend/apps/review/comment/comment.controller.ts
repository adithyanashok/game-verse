import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateCommentDto,
  MessagePatterns,
  UpdateCommentDto,
} from 'libs/common/src';

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

  // Get Comments
  @MessagePattern(MessagePatterns.GET_COMMENT)
  public async getComments(@Payload() payload: number) {
    return this.commentService.getComments(payload);
  }

  // Update Comment
  @MessagePattern(MessagePatterns.UPDATE_COMMENT)
  public async updateComment(@Payload() payload: UpdateCommentDto) {
    return this.commentService.updateComment(payload);
  }

  // Delete Comment
  @MessagePattern(MessagePatterns.DELETE_COMMENT)
  public async deleteComment(
    @Payload() payload: { userId: number; commentId: number },
  ) {
    return this.commentService.deleteComment(payload.userId, payload.commentId);
  }
}
