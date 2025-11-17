import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateCommentDto,
  CreateReviewDto,
  GetByIdDto,
  MessagePatterns,
  SearchDto,
  ServiceName,
  UpdateCommentDto,
  UpdateReviewDto,
} from 'libs/common/src';
import { firstValueFrom } from 'rxjs';
import { CurrentUser } from '../src/decorators/current-user.decorator';
import type { User } from '../src/guards/jwt-auth.guard';
@ApiBearerAuth()
@Controller('review')
export class ReviewController {
  constructor(
    @Inject(ServiceName.REVIEW)
    private readonly reviewClient: ClientProxy,
  ) {}

  /**
   * Create New Review
   */
  @ApiOperation({
    summary: 'Api for creating new Review',
  })
  @ApiResponse({
    status: 201,
    description: 'Review created successfully',
  })
  @Post('create-review')
  public async createReview(
    @CurrentUser() user: User,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.CREATE_REVIEW, {
          dto: createReviewDto,
          userId: user.id,
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Get Review
   */
  @ApiOperation({
    summary: 'Api For Get Review',
  })
  @ApiResponse({
    status: 200,
    description: 'Review Fetched successfully',
  })
  @Get('get-review')
  public async getReview(
    @CurrentUser() user: User,
    @Query('id', ParseIntPipe) id: number,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.GET_REVIEW, {
          reviewId: id,
          userId: user.id,
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Like Review
   */
  @ApiOperation({
    summary: 'Api for liking a review',
  })
  @ApiResponse({
    status: 200,
    description: 'Review liked successfully',
  })
  @Post('like-review')
  public async likeReview(
    @CurrentUser() user: User,

    @Query('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.LIKE_REVIEW, {
          reviewId,
          userId: user.id,
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update Views
   */
  @ApiOperation({
    summary: 'Api For Update Views',
  })
  @ApiResponse({
    status: 200,
    description: 'View Updated Successfully',
  })
  @Post('update-view')
  public async updateView(
    @CurrentUser() user: User,

    @Query('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.INCREASE_VIEWS, {
          reviewId,
          userId: user.id,
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Trending Reviews
   */
  @ApiOperation({
    summary: 'Api For Trending Reviews',
  })
  @ApiResponse({
    status: 200,
    description: 'Trending Review Fetched Successfully',
  })
  @Get('trending-review')
  public async getTrendingReviews(): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.TRENDING_REVIEWS, {}),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Recent Reviews
   */
  @ApiOperation({
    summary: 'Api For Recent Reviews',
  })
  @ApiResponse({
    status: 200,
    description: 'Recent Review Fetched successfully',
  })
  @Get('recent-review')
  public async getRecentReviews(): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.RECENT_REVIEWS, {}),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Search Reviews
   */
  @ApiOperation({
    summary: 'Api For Search Reviews',
  })
  @ApiResponse({
    status: 200,
    description: 'Search Result Fetched Successfully',
  })
  @Get('search-review')
  public async searchReviews(@Query() searchDto: SearchDto): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.SEARCH_REVIEWS, searchDto),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Get Reviews By GameId
   */
  @ApiOperation({
    summary: 'Api For Get Reviews By GameId',
  })
  @ApiResponse({
    status: 200,
    description: 'Reviews Fetched Successfully',
  })
  @Get('get-by-gameid')
  public async getReviewsByGameId(
    @Query() getByGameDto: GetByIdDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(
          MessagePatterns.GET_REVIEW_BY_GAMEID,
          getByGameDto,
        ),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Get Reviews By User
   */
  @ApiOperation({
    summary: 'Api For Get Reviews By User',
  })
  @ApiResponse({
    status: 200,
    description: 'Reviews Fetched Successfully',
  })
  @Get('get-by-user')
  public async getReviewsByUser(
    @Query() getByGameDto: GetByIdDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(
          MessagePatterns.GET_REVIEW_BY_USER,
          getByGameDto,
        ),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update Reviews
   */
  @ApiOperation({
    summary: 'Api For Update Review',
  })
  @ApiResponse({
    status: 200,
    description: 'Review Updated Successfully',
  })
  @Patch('update-review')
  public async updateReview(
    @CurrentUser() user: User,
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<any> {
    console.log(user, updateReviewDto);
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.UPDATE_REVIEWS, {
          dto: updateReviewDto,
          userId: user.id,
        }),
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Delete Review
   */
  @ApiOperation({
    summary: 'Api For Delete Review',
  })
  @ApiResponse({
    status: 200,
    description: 'Deleted Successfully',
  })
  @Delete('delete-review')
  public async deleteReview(
    @CurrentUser() user: User,
    @Query('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.DELETE_REVIEWS, {
          reviewId,
          userId: user.id,
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Add Comment
   */
  @ApiOperation({
    summary: 'Api For Add Comment',
  })
  @ApiResponse({
    status: 201,
    description: 'Coment Added',
  })
  @Post('add-comment')
  public async addComment(
    @CurrentUser() user: User,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.COMMENT_REVIEWS, {
          dto: createCommentDto,
          userId: user.id,
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Get Comments
   */
  @ApiOperation({
    summary: 'Api For Get Comments',
  })
  @ApiResponse({
    status: 200,
    description: 'Coment Fetched',
  })
  @Get('get-comments')
  public async getComments(
    @CurrentUser() user: User,
    @Query('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<any> {
    try {
      console.log(user);
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.GET_COMMENT, {
          reviewId,
          userId: user.id,
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Update Comment
   */
  @ApiOperation({
    summary: 'Api For Update Comment',
  })
  @ApiResponse({
    status: 200,
    description: 'Coment Updated',
  })
  @Patch('update-comment')
  public async updateComment(
    @CurrentUser() user: User,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.UPDATE_COMMENT, {
          dto: updateCommentDto,
          userId: user?.id,
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Delete Comment
   */
  @ApiOperation({
    summary: 'Api For Delete Comment',
  })
  @ApiResponse({
    status: 200,
    description: 'Coment Delete',
  })
  @Delete('delete-comment')
  public async deleteComment(
    @CurrentUser() user: User,
    @Query('reviewId', ParseIntPipe) reviewId: number,
    @Query('commentId', ParseIntPipe) commentId: number,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.DELETE_COMMENT, {
          reviewId,
          userId: user.id,
          commentId,
        }),
      );
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
