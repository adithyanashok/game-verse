import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FollowUserDto {
  @ApiProperty({
    example: 1,
    description: 'ID of the user initiating the follow action',
  })
  @Type(() => Number)
  @IsNumber()
  followerId: number;

  @ApiProperty({
    example: 2,
    description: 'ID of the user to follow or unfollow',
  })
  @Type(() => Number)
  @IsNumber()
  targetUserId: number;
}
