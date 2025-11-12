import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({ example: 'Game', description: 'Search Keyword' })
  @IsString()
  query: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  @Type(() => Number)
  page: number;

  @ApiProperty({ example: '20' })
  @Type(() => Number)
  @IsNumber()
  limit: number;
}
