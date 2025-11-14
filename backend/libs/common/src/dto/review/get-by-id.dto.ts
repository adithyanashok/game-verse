import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class GetByIdDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  page: number;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Type(() => Number)
  limit: number;
}
