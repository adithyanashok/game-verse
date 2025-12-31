import { Controller } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from 'libs/common/src/dto/review/create-review.dto';
import {
  AnalyticsRange,
  GetByIdDto,
  MessagePatterns,
  SearchDto,
  UpdateReviewDto,
} from 'libs/common/src';
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
  public async getReview(
    @Payload() payload: { reviewId: number; userId: number },
  ) {
    return await this.reviewService.getReview(payload.reviewId, payload.userId);
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

  // Get Reviews By User
  @MessagePattern(MessagePatterns.GET_REVIEW_BY_USER)
  public async getReviewsByUser(@Payload() paylod: GetByIdDto) {
    return await this.reviewService.getReviewsByUser(
      paylod.id,
      paylod.page,
      paylod.limit,
    );
  }

  // Get Reviews By GameId
  @MessagePattern(MessagePatterns.GET_REVIEW_BY_GAMEID)
  public async getReviewsByGameId(@Payload() paylod: GetByIdDto) {
    return await this.reviewService.getReviewsByGameId(
      paylod.id,
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

  // Get Overall Rating
  @MessagePattern(MessagePatterns.GET_OVERALL_RATING)
  public async getOverallRating(@Payload() paylod: { gameId: number }) {
    return await this.reviewService.getRatingOfGame(paylod.gameId);
  }

  // Get Overall Rating
  @MessagePattern(MessagePatterns.GET_OVERALL_RATING_OF_GAMES)
  public async getRatingOfGames(@Payload() paylod: { gameId: number[] }) {
    return await this.reviewService.getRatingOfGames(paylod.gameId);
  }

  // Get Review
  @MessagePattern(MessagePatterns.GET_TOP_RATED_GAME_IDS)
  public async getPopularGameIds() {
    return await this.reviewService.getPopularGameIds();
  }

  // Get Analytics Review
  @MessagePattern(MessagePatterns.GET_REVIEW_ANALYTICS)
  public async getAnalyticsOfReview(
    @Payload() paylod: { reviewId: number; range: AnalyticsRange },
  ) {
    return await this.reviewService.getAnalyticsOfReview(
      paylod.reviewId,
      paylod.range,
    );
  }

  @MessagePattern(MessagePatterns.GET_ANALYTICS_OVERVIEW)
  public async getAnalyticsOverview(
    @Payload() paylod: { userId: number; range: AnalyticsRange },
  ) {
    return await this.reviewService.getAnalyticsOverview(
      paylod.userId,
      paylod.range,
    );
  }

  @MessagePattern(MessagePatterns.GET_REVIEWS_BY_GAMEID)
  public async getReviewAndTitle(@Payload() paylod: { gameId: number }) {
    return await this.reviewService.getReviewAndTitle(paylod.gameId);
  }

  @MessagePattern(MessagePatterns.GET_REVIEWS_OF_FOLLOWERS)
  public async getReviewsOfFollowings(
    @Payload() paylod: { userId: number; page: number; limit: number },
  ) {
    return await this.reviewService.getReviewsOfFollowings(
      paylod.userId,
      paylod.limit,
      paylod.page,
    );
  }
}
