import { Inject, Injectable } from '@nestjs/common';
import { Repository, FindOptionsWhere, In } from 'typeorm';
import { Review } from '../entities/review.entity';
import { Like } from '../entities/like.entity';
import { Rating } from '../entities/rating.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import type { Cache } from 'cache-manager';
import {
  AnalyticsRange,
  ApiResponse,
  ErrorHandler,
  MessagePatterns,
  ServiceName,
  UpdateReviewDto,
  User,
} from 'libs/common/src';
import { CreateReviewDto } from 'libs/common/src/dto/review/create-review.dto';
import { firstValueFrom, lastValueFrom } from 'rxjs';
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

    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {}

  // Create Review
  public async createReview(createReviewDto: CreateReviewDto, userId: number) {
    try {
      const [existingUser, game] = await Promise.all([
        lastValueFrom<User>(
          this.userClient.send(MessagePatterns.USER_FIND_BY_ID, userId),
        ),
        lastValueFrom<GameResponse>(
          this.client.send(MessagePatterns.FIND_ONE_GAME, {
            id: createReviewDto.gameId,
          }),
        ),
      ]);

      if (!existingUser) {
        throw new RpcException({ status: 404, message: 'User Not Found' });
      }
      if (!game) {
        throw new RpcException({ status: 404, message: 'Game Not Found' });
      }

      const { rating } = createReviewDto;

      const overall =
        (rating.graphics + rating.gameplay + rating.story + rating.sound) / 4;

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
        ...rating,
        overall,
        review: savedReview,
        gameId: createReviewDto.gameId,
      });

      await this.ratingRepo.save(ratingEntity);
      savedReview.rating = ratingEntity;

      this.client
        .send(MessagePatterns.GENERATE_AI_OVERVIEW, {
          gameId: createReviewDto.gameId,
          savedReview,
        })
        .subscribe({
          error: (err) => console.error('AI Overview Background Error:', err),
        });

      return new ApiResponse(true, 'Review Created Successfully', {
        savedReview,
      });
    } catch (error) {
      console.error('Create Review Error:', error);
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

      const id = review.userId;

      const user: User = await lastValueFrom(
        this.userClient.send(MessagePatterns.USER_FIND_BY_ID, id),
      );

      if (!user) {
        throw new RpcException({
          status: 404,
          message: 'User Not Found',
        });
      }

      const liked = await this.likeRepo.findOne({
        where: { reviewId, userId },
      });

      return new ApiResponse(true, 'Review Fetched Successfully', {
        ...review,
        user,
        isLiked: liked ? true : false,
      });
    } catch (error) {
      ErrorHandler.handle(error, 'Unkwon error occured: Fetch Review');
    }
  }

  public async likeReview(reviewId: number, userId: number) {
    try {
      const alreadyLiked = await this.likeRepo.findOne({
        where: { reviewId, userId },
      });

      if (alreadyLiked) {
        await this.likeRepo.delete(alreadyLiked.id);
        await this.repo.decrement({ id: reviewId }, 'likeCount', 1);

        return new ApiResponse(true, 'Review Unliked Successfully', {
          reviewId,
          isLiked: false,
        });
      }

      const newLike = this.likeRepo.create({
        reviewId,
        userId,
        reviewOwnerId: userId,
      });

      await this.likeRepo.save(newLike);

      await this.repo.increment({ id: reviewId }, 'likeCount', 1);

      return new ApiResponse(true, 'Review Liked Successfully', {
        isLiked: true,
        reviewId,
      });
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException({
        status: 500,
        message: 'Failed to update like',
      });
    }
  }

  // Update Views
  public async updateViews(reviewId: number, userId: number) {
    try {
      const alreadyViewed = await this.viewRepo.findOne({
        where: { reviewId, userId },
      });

      if (alreadyViewed) {
        return new ApiResponse(true, 'Already Viewed');
      }

      await this.viewRepo.save({ reviewId, userId, reviewOwnerId: userId });

      await this.repo.increment({ id: reviewId }, 'viewCount', 1);

      return new ApiResponse(true, 'View Recorded');
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      throw new RpcException({
        status: 500,
        message: 'Failed to update like',
      });
    }
  }

  // Get Trending Reviews
  public async getTrendingReviews() {
    try {
      const result = await this.repo
        .createQueryBuilder('review')
        .leftJoinAndSelect('review.rating', 'rating')
        .orderBy('likeCount', 'DESC')
        .addOrderBy('viewCount', 'DESC')
        .limit(20)
        .getMany();

      const userIds = result.map((review) => review.userId);

      const users = await lastValueFrom<User[]>(
        this.userClient.send(
          MessagePatterns.USER_FIND_MANY_USERNAME_BY_USER_ID,
          userIds,
        ),
      );

      const reviews = result.map((review) => {
        return {
          ...review,
          user: users.find((user) => user.id === review.userId),
        };
      });

      return new ApiResponse(
        true,
        'Trending Review Fetched Successfully',
        reviews,
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get Recent Reviews
  public async getRecentReviews() {
    try {
      const result = await this.repo.find({
        order: { createdAt: 'DESC' },
        take: 20,
        relations: ['rating'],
      });

      const userIds = result.map((review) => review.userId);

      const users = await lastValueFrom<User[]>(
        this.userClient.send(
          MessagePatterns.USER_FIND_MANY_USERNAME_BY_USER_ID,
          userIds,
        ),
      );

      const reviews = result.map((review) => {
        return {
          ...review,
          user: users.find((user) => user.id === review.userId),
        };
      });

      return new ApiResponse(
        true,
        'Recent Reviews Fetched Successfully',
        reviews,
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
      const [data, total] = await this.repo.findAndCount({
        where: { gameId },
        skip: (page - 1) * limit,
        take: limit,
        relations: ['rating'],
      });

      const userIds = data.map((review) => review.userId);

      const users = await lastValueFrom<User[]>(
        this.userClient.send(
          MessagePatterns.USER_FIND_MANY_USERNAME_BY_USER_ID,
          userIds,
        ),
      );
      const userMap = new Map(users.map((u) => [u.id, u]));

      const reviews = data.map((review) => ({
        ...review,
        user: userMap.get(review.userId),
      }));
      return new ApiResponse(true, 'Reviews Fetched Successfully', {
        reviews,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      });
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
      const [reviews, total] = await this.repo.findAndCount({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
        relations: ['rating'],
      });

      return new ApiResponse(true, 'Reviews Fetched Successfully', {
        reviews,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      });
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
      const where: FindOptionsWhere<Review> = {};

      if (query) {
        where.title = SearchLike(`%${query}%`);
      }

      const [reviews, total] = await this.repo.findAndCount({
        where: Object.keys(where).length ? where : undefined,
        take: limit,
        skip: ((page ?? 1) - 1) * (limit ?? 20),
      });

      return new ApiResponse(true, 'Search Result Fetched Successfully', {
        reviews,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      });
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
      const stats: { overall: number; count: string }[] = await this.ratingRepo
        .createQueryBuilder('rating')
        .select('rating.overall', 'overall')
        .addSelect('COUNT(*)', 'count')
        .where('rating.gameId = :gameId', { gameId })
        .groupBy('rating.overall')
        .getRawMany();

      if (stats.length === 0) {
        return { overallRating: 0, ratings: [] };
      }

      const totalReviews = stats.reduce(
        (sum, item) => sum + parseInt(item.count),
        0,
      );
      const weightedSum = stats.reduce(
        (sum, item) => sum + item.overall * parseInt(item.count),
        0,
      );

      const overallRating = parseFloat((weightedSum / totalReviews).toFixed(1));

      const ratings = [5, 4, 3, 2, 1].map((star) => {
        const found = stats.find((s) => s.overall === star);
        const count = found ? parseInt(found.count) : 0;
        return {
          rating: star,
          percent:
            totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0,
        };
      });

      return { overallRating, ratings };
    } catch (error) {
      console.error(error);
      throw new RpcException({ status: 500, message: 'Aggregation failed' });
    }
  }

  // Get Rating of Game
  public async getRatingOfGames(gameIds: number[]) {
    try {
      const overallRatings: Rating[] = await this.ratingRepo
        .createQueryBuilder('rating')
        .select('rating.gameId', 'gameId')
        .addSelect('AVG(rating.overall)', 'overall')
        .where('rating.gameId IN (:...gameIds)', { gameIds })
        .groupBy('rating.gameId')
        .getRawMany();

      return overallRatings.map((item) => ({
        gameId: Number(item.gameId),
        overall: parseFloat(Number(item.overall).toFixed(2)),
      }));
    } catch (error) {
      console.error(error);
      throw new RpcException({
        status: 500,
        message:
          error instanceof Error ? error.message : 'Internal Server Error',
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
      const cacheKey = `analytics:overview:${userId}:${range}`;

      const cachedData = await this.cacheManager.get(cacheKey);
      if (cachedData) return cachedData;

      const endDate = new Date();
      const startDate = subDays(endDate, range);
      const pastStartDate = subDays(startDate, range);

      const [totals, topReviews, totalComment, trendData, chartData] =
        await Promise.all([
          this.repo
            .createQueryBuilder('review')
            .select('SUM(review.likeCount)', 'totalLikes')
            .addSelect('SUM(review.viewCount)', 'totalViews')
            .where('review.userId = :userId', { userId })
            .getRawOne<{
              totalLikes: string | null;
              totalViews: string | null;
            }>(),

          this.repo.find({
            where: { userId },
            relations: ['rating'],
            order: { likeCount: 'DESC', viewCount: 'DESC' },
            take: 5,
          }),

          this.commentService.getCommentCount(userId),

          this.viewRepo
            .createQueryBuilder('view')
            .select(
              `COUNT(CASE WHEN view.createdAt BETWEEN :start AND :end THEN 1 END)`,
              'currentViews',
            )
            .addSelect(
              `COUNT(CASE WHEN view.createdAt BETWEEN :pastStart AND :start THEN 1 END)`,
              'pastViews',
            )
            .where('view.reviewOwnerId = :userId', { userId })
            .setParameters({
              start: startDate,
              end: endDate,
              pastStart: pastStartDate,
            })
            .getRawOne<{
              currentViews: string | null;
              pastViews: string | null;
            }>(),

          this.viewRepo
            .createQueryBuilder('view')
            .select('DATE(view.createdAt)', 'date')
            .addSelect('COUNT(*)', 'count')
            .where('view.reviewOwnerId = :userId', { userId })
            .andWhere('view.createdAt BETWEEN :start AND :end', {
              start: startDate,
              end: endDate,
            })
            .groupBy('DATE(view.createdAt)')
            .orderBy('date', 'ASC')
            .getRawMany<{ date: string; count: string }>(),
        ]);

      const currentViewsCount = parseInt(trendData?.currentViews || '0');
      const pastViewsCount = parseInt(trendData?.pastViews || '0');

      const viewsTrend =
        currentViewsCount === 0
          ? 0
          : ((currentViewsCount - pastViewsCount) / currentViewsCount) * 100;

      const responseData = new ApiResponse(true, 'Fetched Successfully', {
        topReviews,
        totalComment,
        totalLikes: parseInt(totals?.totalLikes || '0'),
        totalViews: parseInt(totals?.totalViews || '0'),
        chartData: chartData.map((v) => ({
          date: v.date,
          count: Number(v.count),
        })),
        views: {
          pastViews: pastViewsCount,
          currentViews: currentViewsCount,
          viewsTrend,
        },
      });

      await this.cacheManager.set(cacheKey, responseData, 900000);

      return responseData;
    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: 500,
        message: 'Analytics aggregation failed',
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

  public async getReviewsOfFollowings(
    userId: number,
    limit: number = 10,
    page: number = 1,
  ) {
    try {
      const ids = await firstValueFrom<number[]>(
        this.userClient.send(MessagePatterns.GET_FOLLOWINGS, {
          userId,
          limit,
          page,
        }),
      );
      const [reviews, total] = await this.repo.findAndCount({
        where: { userId: In(ids) },
        take: limit,
        skip: ((page ?? 1) - 1) * (limit ?? 20),
      });
      console.log(reviews);
      return new ApiResponse(true, 'Reviews Fetched', {
        reviews,
        meta: {
          total,
          page,
          lastPage: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.log(error);
      throw new RpcException({
        status: 500,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
