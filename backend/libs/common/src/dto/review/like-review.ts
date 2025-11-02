import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class LikeReviewDto {
  @ApiProperty({ example: 1, description: 'Id of the review' })
  @IsNumber()
  reviewId: number;

  @ApiProperty({ example: 1, description: 'Id of the user' })
  @IsNumber()
  userId: number;
}
