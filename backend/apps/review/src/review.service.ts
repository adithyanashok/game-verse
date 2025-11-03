import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { Like } from '../entities/like.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiResponse, MessagePatterns, ServiceName } from 'libs/common/src';
import { CreateReviewDto } from 'libs/common/src/dto/review/create-review.dto';
import { lastValueFrom } from 'rxjs';
import { GameResponse } from '@app/contract';
import { View } from '../entities/view.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly repo: Repository<Review>,

    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,

    @InjectRepository(View)
    private readonly viewRepo: Repository<View>,

    @Inject(ServiceName.GAME)
    private client: ClientProxy,
  ) {}

  // Create Review
  public async createReview(createReviewDto: CreateReviewDto) {
    try {
      const game: GameResponse = await lastValueFrom(
        this.client.send(MessagePatterns.FIND_ONE_GAME, {
          id: createReviewDto.gameId,
        }),
      );

      if (!game) {
        throw new RpcException({
          status: 404,
          message: 'Game Not Found',
        });
      }

      const review = this.repo.create(createReviewDto);
      const savedReview = await this.repo.save(review);
      return new ApiResponse(true, 'Review Created Successfully', {
        savedReview,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Get Review
  public async getReview(reviewId: number) {
    try {
      const review = await this.repo.findOneBy({ id: reviewId });
      if (!review) {
        throw new RpcException({
          status: 404,
          message: 'Review Not Found',
        });
      }

      return new ApiResponse(true, 'Review Fetched Successfully', review);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async likeReview(reviewId: number, userId: number) {
    try {
      const review = await this.repo.findOneBy({ id: reviewId });

      if (!review) {
        throw new RpcException({
          status: 404,
          message: 'Review Not Found',
        });
      }

      const existingLike = await this.likeRepo.findOneBy({
        review: { id: reviewId },
        userId,
      });

      if (existingLike) {
        await this.repo
          .createQueryBuilder()
          .relation(Review, 'like')
          .of(reviewId)
          .remove(existingLike.id);

        await this.likeRepo.remove(existingLike);

        return new ApiResponse(true, 'Review Unliked Successfully', {
          liked: false,
          reviewId,
        });
      } else {
        const newLike = this.likeRepo.create({
          userId,
        });
        const savedLike = await this.likeRepo.save(newLike);

        await this.repo
          .createQueryBuilder()
          .relation(Review, 'like')
          .of(reviewId)
          .add(savedLike.id);

        return new ApiResponse(true, 'Review Liked Successfully', {
          liked: true,
          reviewId,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async increaseViews(reviewId: number, userId: number) {
    try {
      const review = await this.repo.findOneBy({ id: reviewId });

      if (!review) {
        throw new RpcException({
          status: 404,
          message: 'Review Not Found',
        });
      }

      const alreadyViewed = await this.viewRepo.findOneBy({
        review: { id: reviewId },
        userId,
      });

      if (!alreadyViewed) {
        const newView = this.viewRepo.create({
          userId,
        });
        const savedSavedView = await this.viewRepo.save(newView);

        await this.repo
          .createQueryBuilder()
          .relation(Review, 'view')
          .of(reviewId)
          .add(savedSavedView.id);

        return new ApiResponse(true, 'View Increased Successfully', {
          viewed: true,
          reviewId,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get Trending Reviews
  public async getTrendingReviews() {
    try {
      const review = await this.repo
        .createQueryBuilder('review')
        .orderBy('review.views', 'DESC')
        .addOrderBy('review.likes', 'DESC')
        .limit(10)
        .getMany();

      return new ApiResponse(
        true,
        'Trending Review Fetched Successfully',
        review,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
