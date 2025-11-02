import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateReviewDto, MessagePatterns, ServiceName } from 'libs/common/src';
import { firstValueFrom } from 'rxjs';

@Controller()
export class ReviewController {
  constructor(
    @Inject(ServiceName.REVIEW)
    private readonly reviewClient: ClientProxy,
  ) {}

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
}
