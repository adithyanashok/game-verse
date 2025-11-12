import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetByGameIdDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  gameId: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
