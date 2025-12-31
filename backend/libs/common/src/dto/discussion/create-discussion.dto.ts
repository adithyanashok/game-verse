import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDiscussionDto {
  @ApiProperty({ example: "Let's discuss about GTA VI" })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Discuss about GTA VI' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
