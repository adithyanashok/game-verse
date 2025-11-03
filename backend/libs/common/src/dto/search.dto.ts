import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({ example: 'Game', description: 'Search Keyword' })
  @IsString()
  query: string;

  @ApiProperty({ example: '1' })
  @IsNumber()
  page: number;

  @ApiProperty({ example: '20' })
  @IsNumber()
  limit: number;
}
