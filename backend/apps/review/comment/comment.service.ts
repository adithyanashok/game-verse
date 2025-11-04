import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ApiResponse,
  CreateCommentDto,
  UpdateCommentDto,
} from 'libs/common/src';
import { Review } from '../entities/review.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CommentService {
  constructor(
    /**
     * Injecting CommentRepository
     */
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,

    /**
     * Injecting ReviewRepository
     */
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  // Create Comment
  public async createComment(createCommentDto: CreateCommentDto) {
    try {
      const { reviewId, comment, userId } = createCommentDto;
      const review = await this.reviewRepo.findOneBy({ id: reviewId });
      console.log(review);

      if (!review) {
        throw new RpcException({
          status: 404,
          message: `Review with ID ${reviewId} not found`,
        });
      }

      const newComment = this.commentRepo.create({
        comment,
        userId,
        review,
      });

      const savedComment = await this.commentRepo.save(newComment);
      return new ApiResponse(true, 'Comment Created', savedComment);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get Comments
  public async getComments(reviewId: number) {
    try {
      const dbComment = await this.commentRepo.find({
        where: { review: { id: reviewId } },
      });

      return new ApiResponse(true, 'Comment Fetched', dbComment);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Edit Comment
  public async updateComment(updateComment: UpdateCommentDto) {
    try {
      const { reviewId, comment, userId, commentId } = updateComment;

      const dbComment = await this.commentRepo.findOne({
        where: { review: { id: reviewId }, userId, id: commentId },
      });

      if (!dbComment) {
        throw new RpcException({
          status: 404,
          message: `Comment with ID ${commentId} not found`,
        });
      }

      dbComment.comment = comment ?? dbComment?.comment;

      const savedComment = await this.commentRepo.save(dbComment);
      return new ApiResponse(true, 'Comment Edited', savedComment);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Delete Comment
  public async deleteComment(userId: number, commentId: number) {
    try {
      const dbComment = await this.commentRepo.findOne({
        where: { userId, id: commentId },
      });

      if (!dbComment) {
        throw new RpcException({
          status: 404,
          message: `Comment with ID ${commentId} not found`,
        });
      }

      const deleted = await this.commentRepo.delete(commentId);

      return new ApiResponse(true, 'Comment Deleted', deleted);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
