import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { Like } from '../entities/like.entity';
import { Rating } from '../entities/rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  ApiResponse,
  MessagePatterns,
  ServiceName,
  UpdateReviewDto,
  User,
} from 'libs/common/src';
import { CreateReviewDto } from 'libs/common/src/dto/review/create-review.dto';
import { lastValueFrom } from 'rxjs';
import { GameResponse } from '@app/contract';
import { View } from '../entities/view.entity';
import { Like as SearchLike } from 'typeorm';
@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly repo: Repository<Review>,

    @InjectRepository(Like)
    private readonly likeRepo: Repository<Like>,

    @InjectRepository(View)
    private readonly viewRepo: Repository<View>,

    @InjectRepository(Rating)
    private readonly ratingRepo: Repository<Rating>,

    @Inject(ServiceName.GAME)
    private client: ClientProxy,

    @Inject(ServiceName.USER)
    private userClient: ClientProxy,
  ) {}

  // Create Review
  public async createReview(createReviewDto: CreateReviewDto, userId: number) {
    try {
      const existingUser: User = await lastValueFrom(
        this.userClient.send(MessagePatterns.USER_FIND_BY_ID, userId),
      );
      if (!existingUser) {
        throw new RpcException({
          status: 404,
          message: 'User Not Found',
        });
      }
      const rating = createReviewDto.rating;
      console.log('review ceated', createReviewDto, userId);

      const game: GameResponse = await lastValueFrom(
        this.client.send(MessagePatterns.FIND_ONE_GAME, {
          id: createReviewDto.gameId,
        }),
      );

      const overall =
        (rating.graphics + rating.gameplay + rating.story + rating.sound) / 4;

      if (!game) {
        throw new RpcException({
          status: 404,
          message: 'Game Not Found',
        });
      }

      const review = this.repo.create({
        title: createReviewDto.title,
        text: createReviewDto.comment,
        userId: existingUser.id,
        gameId: createReviewDto.gameId,
        imageUrl: game.imgUrl,
        userName: existingUser.name,
      });

      const savedReview = await this.repo.save(review);

      const ratingEntity = this.ratingRepo.create({
        graphics: rating.graphics,
        gameplay: rating.gameplay,
        story: rating.story,
        sound: rating.sound,
        overall,
        review: savedReview,
        gameId: createReviewDto.gameId,
      });

      savedReview.rating = ratingEntity;
      await this.ratingRepo.save(ratingEntity);

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
      const review = await this.repo.findOne({
        where: { id: reviewId },
        relations: ['rating'],
      });
      console.log(review);

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
      const review = await this.repo.findOne({
        where: { id: reviewId },
      });

      if (!review) {
        throw new RpcException({
          status: 404,
          message: 'Review Not Found',
        });
      }
      const alreadyLiked = await this.likeRepo.findOne({
        where: { reviewId, userId },
      });

      if (alreadyLiked) {
        await this.likeRepo.delete(alreadyLiked.id);
        review.likeCount = review.likeCount - 1;
        const savedReview = await this.repo.save(review);

        return new ApiResponse(true, 'Review Unliked Successfully', {
          liked: false,
          reviewId,
          likeCount: savedReview.likeCount,
        });
      }

      const newLike = this.likeRepo.create({ reviewId, userId });
      review.likeCount = review.likeCount + 1;

      await this.likeRepo.save(newLike);

      const savedReview = await this.repo.save(review);

      return new ApiResponse(true, 'Review Unliked Successfully', {
        liked: false,
        reviewId,
        likeCount: savedReview.likeCount,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException({
        status: 500,
        message: 'Failed to update like status',
      });
    }
  }

  // Update Views
  public async updateViews(reviewId: number, userId: number) {
    try {
      console.log('reviewId: ', reviewId);
      console.log('userId ', userId);

      const review = await this.repo.findOne({
        where: { id: reviewId },
        relations: ['views'],
      });

      if (!review) {
        throw new RpcException({
          status: 404,
          message: 'Review Not Found',
        });
      }

      const alreadyViewed = await this.viewRepo.findOne({
        where: { userId, review: { id: reviewId } },
      });

      if (alreadyViewed) {
        return new ApiResponse(true, 'Already Viewed', {
          viewed: true,
          alreadyViewed,
        });
      } else {
        const newView = this.viewRepo.create({
          userId,
        });
        const savedSavedView = await this.viewRepo.save(newView);
        review.viewCount = review.viewCount + 1;

        await this.repo.save(review);
        await this.repo
          .createQueryBuilder()
          .relation(Review, 'views')
          .of(reviewId)
          .add(savedSavedView.id);

        return new ApiResponse(true, 'View Updated Successfully', {
          viewed: true,
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
        .leftJoin('review.views', 'views')
        .leftJoinAndSelect('review.rating', 'rating')
        .loadRelationCountAndMap('review.viewCount', 'review.views')
        .orderBy('likeCount', 'DESC')
        .addOrderBy('viewCount', 'DESC')
        .limit(10)
        .getMany();

      console.log(review);

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

  // Get Recent Reviews
  public async getRecentReviews() {
    try {
      const review = await this.repo.find({
        order: { createdAt: 'DESC' },
        take: 10,
        relations: ['rating'],
      });

      return new ApiResponse(
        true,
        'Recent Reviews Fetched Successfully',
        review,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getReviewsByGameId(
    gameId: number,
    page: number = 1,
    limit: number = 20,
  ) {
    try {
      const review = await this.repo.find({
        where: { gameId },
        skip: (page - 1) * limit,
        take: limit,
        relations: ['rating'],
      });

      return new ApiResponse(true, 'Reviews Fetched Successfully', review);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get Reviews by user
  public async getReviewsByUser(
    userId: number,
    page: number = 1,
    limit: number = 20,
  ) {
    try {
      const review = await this.repo.find({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
        relations: ['rating'],
      });

      return new ApiResponse(true, 'Reviews Fetched Successfully', review);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Search Reviews
  public async searchReviews(
    query: string,
    page: number = 1,
    limit: number = 20,
  ) {
    try {
      const reviews = await this.repo.find({
        where: { title: SearchLike(`%${query}%`) },
        take: limit,
        skip: ((page ?? 1) - 1) * (limit ?? 20),
      });

      return new ApiResponse(
        true,
        'Search Result Fetched Successfully',
        reviews,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Update Reviews
  public async updateReview(updateReviewDto: UpdateReviewDto, userId: number) {
    try {
      const { id, comment, title } = updateReviewDto;
      const review = await this.repo.findOne({
        where: { id, userId },
      });

      if (!review) {
        throw new RpcException({
          status: 404,
          message: 'Review not found',
        });
      }

      review.text = comment ?? review.text;
      review.title = title ?? review.title;

      const updatedReview = await this.repo.save(review);

      return new ApiResponse(
        true,
        'Review Updated Successfully',
        updatedReview,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Delete Review
  public async deleteReview(id: number, userId: number) {
    try {
      const review = await this.repo.findOne({
        where: { id, userId },
      });

      if (!review) {
        throw new RpcException({
          status: 404,
          message: 'Review not found',
        });
      }

      const deletedReview = await this.repo.delete(id);

      return new ApiResponse(true, 'Deleted Successfully', deletedReview);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get Rating of Game
  public async getRatingOfGame(gameId: number) {
    try {
      const result = await this.ratingRepo.findAndCount({
        where: { gameId },
      });

      const rating = result[0];
      const total: number = result[1];

      // Calculate Count of rating
      const countByRating: Record<number, number> = rating.reduce(
        (acc: Record<number, number>, rating) => {
          acc[rating.overall] = (acc[rating.overall] || 0) + 1;
          return acc;
        },
        {},
      );

      // Calculate percentage
      const ratings = Object.keys(countByRating)
        .sort((a, b) => Number(b) - Number(a))
        .map((rating) => ({
          rating: Number(rating),
          percent: Number(((countByRating[rating] / total) * 100).toFixed(0)),
        }));

      // Calculate Overall Rating
      const overallRating =
        ratings.reduce((acc, val) => acc + val.rating, 0) / ratings.length;

      return { overallRating, ratings };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  // Get Rating of Game
  public async getPopularGameIds() {
    try {
      console.log('getPopularGames');

      const result = await this.repo
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.rating', 'rating')
        .where('rating.id IS NOT NULL')
        .getMany();

      const topRatedGames = result.sort(
        (a, b) => b.rating.overall - a.rating.overall,
      );

      const topRatedGameIds = topRatedGames.map((game) => {
        return game.rating.gameId;
      });

      return topRatedGameIds;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
