import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ description: 'Enter Game Genre' })
  @IsString()
  name: string;
}
