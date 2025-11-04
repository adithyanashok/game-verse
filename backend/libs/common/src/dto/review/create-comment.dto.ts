import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 8, description: 'UserId of user' })
  @IsNumber()
  userId: number;

  @ApiProperty({
    example: 'Very good Review',
    description: 'Comment of the review',
  })
  @IsString()
  comment: string;

  @ApiProperty({ example: 1, description: 'Associated Review ID' })
  @IsNumber()
  reviewId: number;
}
