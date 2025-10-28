import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ example: 'Chess', description: 'Name of the game' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Strategy', description: 'Category of the game' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Strategy', description: 'Category of the game' })
  @IsString()
  imgUrl: string;
}
