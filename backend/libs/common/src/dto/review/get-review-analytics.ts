import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { AnalyticsRange } from '../../enums/analytics_range.enum';
import { Transform, Type } from 'class-transformer';

export class GetReviewAnalyticsDto {
  @ApiProperty({
    description: 'Range for the analytics',
    enum: Object.keys(AnalyticsRange).filter((k) => isNaN(Number(k))),
  })
  @IsEnum(AnalyticsRange)
  @Transform(({ value }: { value: number }) => AnalyticsRange[value])
  range: AnalyticsRange;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Type(() => Number)
  reviewId: number;
}
