import { Controller } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from 'libs/common/src/dto/review/create-review.dto';
import { MessagePatterns, SearchDto, UpdateReviewDto } from 'libs/common/src';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // Create Review
  @MessagePattern(MessagePatterns.CREATE_REVIEW)
  public async createReview(
    @Payload() payload: { dto: CreateReviewDto; userId: number },
  ) {
    return await this.reviewService.createReview(payload.dto, payload.userId);
  }

  // Get Review
  @MessagePattern(MessagePatterns.GET_REVIEW)
  public async getReview(@Payload() payload: number) {
    console.log(payload);
    return await this.reviewService.getReview(payload);
  }

  // Like Review
  @MessagePattern(MessagePatterns.LIKE_REVIEW)
  public async likeReview(
    @Payload() payload: { reviewId: number; userId: number },
  ) {
    return await this.reviewService.likeReview(
      payload.reviewId,
      payload.userId,
    );
  }

  // Updated Views
  @MessagePattern(MessagePatterns.INCREASE_VIEWS)
  public async increaseViews(
    @Payload() payload: { reviewId: number; userId: number },
  ) {
    return await this.reviewService.updateViews(
      payload.reviewId,
      payload.userId,
    );
  }

  // Trending Reviews
  @MessagePattern(MessagePatterns.TRENDING_REVIEWS)
  public async getTrendingReviews() {
    return await this.reviewService.getTrendingReviews();
  }

  // Recent Reviews
  @MessagePattern(MessagePatterns.RECENT_REVIEWS)
  public async getRecentReviews() {
    return await this.reviewService.getRecentReviews();
  }

  // Search Reviews
  @MessagePattern(MessagePatterns.SEARCH_REVIEWS)
  public async searchReviews(@Payload() paylod: SearchDto) {
    return await this.reviewService.searchReviews(
      paylod.query,
      paylod.page,
      paylod.limit,
    );
  }

  // Update Review
  @MessagePattern(MessagePatterns.UPDATE_REVIEWS)
  public async updateReview(
    @Payload() paylod: { dto: UpdateReviewDto; userId: number },
  ) {
    return await this.reviewService.updateReview(paylod.dto, paylod.userId);
  }

  // Delete Review
  @MessagePattern(MessagePatterns.DELETE_REVIEWS)
  public async deleteReview(
    @Payload() paylod: { reviewId: number; userId: number },
  ) {
    return await this.reviewService.deleteReview(
      paylod.reviewId,
      paylod.userId,
    );
  }
}
