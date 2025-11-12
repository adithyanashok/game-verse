import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class CreateRatingDto {
  @ApiProperty({ example: 8, description: 'Graphics rating (0–10)' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10)
  graphics: number;

  @ApiProperty({ example: 9, description: 'Gameplay rating (0–10)' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10)
  gameplay: number;

  @ApiProperty({ example: 7, description: 'Story rating (0–10)' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10)
  story: number;

  @ApiProperty({ example: 8, description: 'Sound rating (0–10)' })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(10)
  sound: number;
}
