import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { AnalyticsRange } from '../../enums/analytics_range.enum';
import { Transform } from 'class-transformer';

export class GetAnalyticsOverviewDto {
  @ApiProperty({
    description: 'Range for the analytics',
    enum: Object.keys(AnalyticsRange).filter((k) => isNaN(Number(k))),
  })
  @IsEnum(AnalyticsRange)
  @Transform(({ value }: { value: number }) => AnalyticsRange[value])
  range: AnalyticsRange;
}
