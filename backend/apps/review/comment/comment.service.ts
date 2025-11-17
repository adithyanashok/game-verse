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
  public async createComment(
    createCommentDto: CreateCommentDto,
    userId: number,
  ) {
    try {
      const { reviewId, comment, parentCommentId } = createCommentDto;
      const review = await this.reviewRepo.findOneBy({ id: reviewId });
      console.log(review);

      if (!review) {
        throw new RpcException({
          status: 404,
          message: `Review with ID ${reviewId} not found`,
        });
      }

      if (parentCommentId) {
        const parent = await this.commentRepo.findOne({
          where: { id: parentCommentId, review: { id: reviewId } },
        });
        if (!parent) {
          throw new RpcException({
            status: 404,
            message: `Parent comment with ID ${parentCommentId} not found`,
          });
        }
      }

      const newComment = this.commentRepo.create({
        comment,
        userId,
        review,
        parentCommentId: parentCommentId ?? null,
      });

      const savedComment = await this.commentRepo.save(newComment);
      return new ApiResponse(true, 'Comment Created', {
        ...savedComment,
        isYourComment: userId === savedComment.userId,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get Comments
  public async getComments(reviewId: number, userId: number) {
    try {
      const dbComment = await this.commentRepo.find({
        where: { review: { id: reviewId } },
        order: { createdAt: 'DESC' },
      });

      console.log(userId);

      const newComments = dbComment.map((val: Comment) => {
        const isYourComment = val.userId === userId;
        return {
          ...val,
          isYourComment,
        };
      });
      return new ApiResponse(true, 'Comment Fetched', newComments);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Edit Comment
  public async updateComment(updateComment: UpdateCommentDto, userId: number) {
    try {
      const { reviewId, comment, commentId } = updateComment;

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
  public async deleteComment(
    reviewId: number,
    userId: number,
    commentId: number,
  ) {
    try {
      const review = await this.reviewRepo.findOneBy({ id: reviewId });
      if (!review) {
        throw new RpcException({
          status: 404,
          message: `Review with ID ${reviewId} not found`,
        });
      }
      const dbComment = await this.commentRepo.findOne({
        where: { userId, id: commentId },
      });

      if (!dbComment) {
        throw new RpcException({
          status: 404,
          message: `Comment with ID ${commentId} not found`,
        });
      }

      await this.commentRepo.delete(commentId);

      return new ApiResponse(true, 'Comment Deleted', { reviewId, commentId });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
