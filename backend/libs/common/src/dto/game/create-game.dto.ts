import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ example: 'Chess', description: 'Name of the game' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Strategy', description: 'Category of the game' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'Dec 10, 2022', description: 'Release Date Of Game' })
  @IsString()
  releaseDate: string;

  @ApiProperty({ example: 'Strategy', description: 'Category of the game' })
  @IsString()
  imgUrl: string;

  @ApiProperty({
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  genre: number[];
}
