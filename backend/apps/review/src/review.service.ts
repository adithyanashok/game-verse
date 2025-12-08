import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { Like } from '../entities/like.entity';
import { Rating } from '../entities/rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  AnalyticsRange,
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
import { subDays } from 'date-fns';
import { CommentService } from '../comment/comment.service';
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

    private readonly commentService: CommentService,

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

      this.client
        .send(MessagePatterns.GENERATE_AI_OVERVIEW, {
          gameId: createReviewDto.gameId,
          savedReview,
        })
        .subscribe({
          error: (err) => console.error('AI Overview Error:', err),
        });

      return new ApiResponse(true, 'Review Created Successfully', {
        savedReview,
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Get Review
  public async getReview(reviewId: number, userId: number) {
    try {
      const review = await this.repo.findOne({
        where: { id: reviewId },
        relations: ['rating'],
      });

      if (!review) {
        throw new RpcException({
          status: 404,
          message: 'Review Not Found',
        });
      }

      const liked = await this.likeRepo.findOne({
        where: { reviewId, userId },
      });

      return new ApiResponse(true, 'Review Fetched Successfully', {
        ...review,
        isLiked: liked ? true : false,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async likeReview(reviewId: number, userId: number) {
    console.log(reviewId, userId);
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
          isLiked: false,
          reviewId,
          likeCount: savedReview.likeCount,
        });
      }

      const newLike = this.likeRepo.create({
        reviewId,
        userId,
        reviewOwnerId: review.userId,
      });
      review.likeCount = review.likeCount + 1;

      const like = await this.likeRepo.save(newLike);

      const savedReview = await this.repo.save(review);

      return new ApiResponse(true, 'Review liked Successfully', {
        isLiked: userId === like.userId,
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
      const review = await this.repo.findOne({
        where: { id: reviewId },
      });

      if (!review) {
        throw new RpcException({
          status: 404,
          message: 'Review Not Found',
        });
      }
      const alreadyViewed = await this.viewRepo.findOne({
        where: { reviewId, userId },
      });

      if (alreadyViewed) {
        return new ApiResponse(true, 'Already Viewed');
      }

      const newView = this.viewRepo.create({
        reviewId,
        userId,
        reviewOwnerId: review.userId,
      });
      review.viewCount = review.viewCount + 1;

      const view = await this.viewRepo.save(newView);

      const savedReview = await this.repo.save(review);

      return new ApiResponse(true, 'Review viewd Successfully', {
        isViewed: userId === view.userId,
        reviewId,
        viewCount: savedReview.viewCount,
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

  // Get Trending Reviews
  public async getTrendingReviews() {
    try {
      const review = await this.repo
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.rating', 'rating')
        .orderBy('likeCount', 'DESC')
        .addOrderBy('viewCount', 'DESC')
        .limit(20)
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
        take: 20,
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
      const newDate = new Date();
      console.log(newDate, subDays(newDate, 7));
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
        where: { id },
      });

      if (!review) {
        throw new RpcException({
          status: 404,
          message: 'Review not found',
        });
      }

      if (userId !== review.userId) {
        throw new RpcException({
          status: 400,
          message: 'Unauthorized',
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
        where: { id },
      });

      if (!review) {
        throw new RpcException({
          status: 404,
          message: 'Review not found',
        });
      }
      if (userId !== review.userId) {
        throw new RpcException({
          status: 400,
          message: 'Unauthorized',
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
      throw new RpcException({
        status: 500,
        message: error instanceof Error ? error.message : String(error),
      });
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
      throw new RpcException({
        status: 500,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Analytics of Review
  public async getAnalyticsOfReview(reviewId: number, range: AnalyticsRange) {
    try {
      const review = await this.repo.findOne({ where: { id: reviewId } });
      if (!review) {
        throw new RpcException({ status: 404, message: 'Review not found' });
      }

      const endDate = new Date();
      const startDate = subDays(endDate, range);
      const pastStartDate = subDays(startDate, range);

      const likeCount = await this.likeRepo
        .createQueryBuilder('like')
        .where('like.reviewId = :reviewId', { reviewId })
        .andWhere('like.createdAt BETWEEN :start AND :end', {
          start: startDate,
          end: endDate,
        })
        .getCount();

      const viewGroups: { date: string; count: string }[] = await this.viewRepo
        .createQueryBuilder('view')
        .select('DATE(view.createdAt)', 'date')
        .addSelect('COUNT(*)', 'count')
        .where('view.reviewId = :reviewId', { reviewId })
        .andWhere('view.createdAt BETWEEN :start AND :end', {
          start: startDate,
          end: endDate,
        })
        .groupBy('DATE(view.createdAt)')
        .orderBy('DATE(view.createdAt)', 'ASC')
        .getRawMany();

      const chartData = viewGroups.map((v) => ({
        date: v.date,
        count: Number(v.count),
      }));

      const currentViews = chartData.reduce((sum, item) => sum + item.count, 0);

      const pastViews = await this.viewRepo
        .createQueryBuilder('view')
        .where('view.reviewId = :reviewId', { reviewId })
        .andWhere('view.createdAt BETWEEN :pastStart AND :start', {
          pastStart: pastStartDate,
          start: startDate,
        })
        .getCount();

      const trend =
        currentViews === 0
          ? 0
          : ((currentViews - pastViews) / currentViews) * 100;

      return new ApiResponse(true, 'Fetched Successfully', {
        chartData,
        likeCount,
        viewCount: currentViews,
        trend,
      });
    } catch (error) {
      console.error(error);
      throw new RpcException({
        status: 500,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Analytics Overview
  public async getAnalyticsOverview(userId: number, range: AnalyticsRange) {
    try {
      const review = await this.repo.find({ where: { userId } });

      const totalLikes = review.reduce((acc: number, curr) => {
        return acc + (curr.likeCount ?? 0);
      }, 0);

      const totalViews = review.reduce((acc: number, curr) => {
        return acc + (curr.viewCount ?? 0);
      }, 0);

      const totalComment = await this.commentService.getCommentCount(userId);

      const topReviews = await this.repo
        .createQueryBuilder('review')
        .where('review.userId = :userId', { userId })
        .leftJoinAndSelect('review.rating', 'rating')
        .orderBy('likeCount', 'DESC')
        .addOrderBy('viewCount', 'DESC')
        .limit(5)
        .getMany();

      const endDate = new Date();
      const startDate = subDays(endDate, range);
      const pastStartDate = subDays(startDate, range);

      const currentViews = await this.viewRepo
        .createQueryBuilder('view')
        .where('view.reviewOwnerId = :reviewOwnerId', { reviewOwnerId: userId })
        .andWhere('view.createdAt BETWEEN :start AND :end', {
          start: startDate,
          end: endDate,
        })
        .getManyAndCount();

      const viewGroups: { date: string; count: string }[] = await this.viewRepo
        .createQueryBuilder('view')
        .select('DATE(view.createdAt)', 'date')
        .addSelect('COUNT(*)', 'count')
        .where('view.reviewOwnerId = :reviewOwnerId', { reviewOwnerId: userId })
        .andWhere('view.createdAt BETWEEN :start AND :end', {
          start: startDate,
          end: endDate,
        })
        .groupBy('DATE(view.createdAt)')
        .orderBy('DATE(view.createdAt)', 'ASC')
        .getRawMany();

      const chartData = viewGroups.map((v) => ({
        date: v.date,
        count: Number(v.count),
      }));

      const pastViews = await this.viewRepo
        .createQueryBuilder('view')
        .where('view.reviewOwnerId = :reviewOwnerId', { reviewOwnerId: userId })
        .andWhere('view.createdAt BETWEEN :pastStart AND :start', {
          pastStart: pastStartDate,
          start: startDate,
        })
        .getCount();

      // Like

      const currentLikes = await this.likeRepo
        .createQueryBuilder('like')
        .where('like.reviewOwnerId = :reviewOwnerId', { reviewOwnerId: userId })
        .andWhere('like.createdAt BETWEEN :start AND :end', {
          start: startDate,
          end: endDate,
        })
        .getCount();
      const pastLikes = await this.likeRepo
        .createQueryBuilder('like')
        .where('like.reviewOwnerId = :reviewOwnerId', { reviewOwnerId: userId })
        .andWhere('like.createdAt BETWEEN :pastStart AND :start', {
          pastStart: pastStartDate,
          start: startDate,
        })
        .getCount();

      // Trends
      const viewsTrend =
        currentViews[1] === 0
          ? 0
          : ((currentViews[1] - pastViews) / currentViews[1]) * 100;

      const likeTrend =
        currentLikes === 0
          ? 0
          : ((currentLikes - pastLikes) / currentLikes) * 100;

      return new ApiResponse(true, 'Fetched Successfully', {
        topReviews,
        totalComment,
        totalLikes,
        totalViews,
        chartData,
        likes: { pastLikes, currentLikes, likeTrend },
        views: { pastViews, currentViews: currentViews[1], viewsTrend },
      });
    } catch (error) {
      console.error(error);
      throw new RpcException({
        status: 500,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  // Get Review Title and Review
  public async getReviewAndTitle(gameId: number) {
    try {
      const ratings = [5, 4, 3, 1];

      const promises = ratings.map((rating) =>
        this.repo
          .createQueryBuilder('review')
          .innerJoinAndSelect('review.rating', 'rating')
          .where('review.gameId = :gameId', { gameId })
          .andWhere('rating.overall = :rating', { rating })
          .take(10)
          .orderBy('review.id', 'DESC')
          .getMany(),
      );

      const [rating5, rating4, rating3, rating1] = await Promise.all(promises);

      return { ...rating5, ...rating4, ...rating3, ...rating1 };
    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: 500,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
