import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ example: 'Chess', description: 'Name of the game' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'This is a good game',
    description: 'Comment of the game',
  })
  @IsString()
  comment: string;

  @ApiProperty({ example: 1, description: 'Id of the user', default: 1 })
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 1, description: 'Id of the game' })
  @IsNumber()
  gameId: number;

  @ApiProperty({ example: 4.4, description: 'Rating of the game' })
  @IsNumber()
  rating: number;
}
