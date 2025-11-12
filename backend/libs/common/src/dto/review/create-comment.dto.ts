import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'Very good Review',
    description: 'Comment of the review',
  })
  @IsString()
  comment: string;

  @ApiProperty({ example: 1, description: 'Associated Review ID' })
  @IsNumber()
  reviewId: number;

  @ApiPropertyOptional({
    example: 10,
    description: 'If provided, creates a reply to this parent comment',
  })
  @IsOptional()
  @IsNumber()
  parentCommentId?: number;
}
