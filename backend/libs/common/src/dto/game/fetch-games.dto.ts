import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class FetchGamesDto {
  @ApiProperty({ example: '1', required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiProperty({ example: '20', required: false })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiProperty({
    example: 'Game',
    description: 'Search Keyword',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
