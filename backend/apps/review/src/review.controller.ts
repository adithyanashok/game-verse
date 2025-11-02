import { Controller } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from 'libs/common/src/dto/review/create-review.dto';
import { MessagePatterns } from 'libs/common/src';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @MessagePattern(MessagePatterns.CREATE_REVIEW)
  public async createReview(@Payload() payload: CreateReviewDto) {
    return await this.reviewService.createReview(payload);
  }

  @MessagePattern(MessagePatterns.LIKE_REVIEW)
  public async likeReview(
    @Payload() payload: { reviewId: number; userId: number },
  ) {
    return await this.reviewService.likeReview(
      payload.reviewId,
      payload.userId,
    );
  }
}
