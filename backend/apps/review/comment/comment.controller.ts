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
  public async addComment(
    @Payload() payload: { dto: CreateCommentDto; userId: number },
  ) {
    return this.commentService.createComment(payload.dto, payload.userId);
  }

  // Get Comments
  @MessagePattern(MessagePatterns.GET_COMMENT)
  public async getComments(
    @Payload() payload: { reviewId: number; userId: number },
  ) {
    return this.commentService.getComments(payload.reviewId, payload.userId);
  }

  // Update Comment
  @MessagePattern(MessagePatterns.UPDATE_COMMENT)
  public async updateComment(
    @Payload() payload: { dto: UpdateCommentDto; userId: number },
  ) {
    return this.commentService.updateComment(payload.dto, payload.userId);
  }

  // Delete Comment
  @MessagePattern(MessagePatterns.DELETE_COMMENT)
  public async deleteComment(
    @Payload() payload: { reviewId: number; userId: number; commentId: number },
  ) {
    return this.commentService.deleteComment(
      payload.reviewId,
      payload.userId,
      payload.commentId,
    );
  }
}
