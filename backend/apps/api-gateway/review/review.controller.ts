import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateCommentDto,
  CreateReviewDto,
  LikeReviewDto,
  MessagePatterns,
  SearchDto,
  ServiceName,
  UpdateCommentDto,
  UpdateReviewDto,
} from 'libs/common/src';
import { firstValueFrom } from 'rxjs';

@Controller()
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
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.CREATE_REVIEW, createReviewDto),
      );
    } catch (error) {
      return error;
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
  public async getReview(@Query('id', ParseIntPipe) id: number): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.GET_REVIEW, id),
      );
    } catch (error) {
      return error;
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
  public async likeReview(@Body() likeReviewDto: LikeReviewDto): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.LIKE_REVIEW, likeReviewDto),
      );
    } catch (error) {
      return error;
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
  public async updateReviews(
    @Body() likeReviewDto: LikeReviewDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.INCREASE_VIEWS, likeReviewDto),
      );
    } catch (error) {
      return error;
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
      return error;
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
      return error;
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
      return error;
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
    @Body() updateReviewDto: UpdateReviewDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.UPDATE_REVIEWS, updateReviewDto),
      );
    } catch (error) {
      return error;
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
    @Body() likeReviewDto: LikeReviewDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.DELETE_REVIEWS, likeReviewDto),
      );
    } catch (error) {
      return error;
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
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(
          MessagePatterns.COMMENT_REVIEWS,
          createCommentDto,
        ),
      );
    } catch (error) {
      return error;
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
    @Query('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.GET_COMMENT, reviewId),
      );
    } catch (error) {
      return error;
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
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(
          MessagePatterns.UPDATE_COMMENT,
          updateCommentDto,
        ),
      );
    } catch (error) {
      return error;
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
    @Query('reviewId', ParseIntPipe) commentId: number,
  ): Promise<any> {
    try {
      return await firstValueFrom(
        this.reviewClient.send(MessagePatterns.DELETE_COMMENT, {
          userId: 8,
          commentId,
        }),
      );
    } catch (error) {
      return error;
    }
  }
}
