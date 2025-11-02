import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ApiResponse, MessagePatterns, ServiceName } from 'libs/common/src';
import { CreateReviewDto } from 'libs/common/src/dto/review/create-review.dto';
import { lastValueFrom } from 'rxjs';
import { GameResponse } from '@app/contract';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly repo: Repository<Review>,

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
}
