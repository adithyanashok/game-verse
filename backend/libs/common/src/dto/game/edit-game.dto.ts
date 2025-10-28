import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGameDto } from './create-game.dto';
import { IsNumber } from 'class-validator';

export class EditGameDto extends PartialType(CreateGameDto) {
  @ApiProperty({ example: 1 })
  @IsNumber()
  id: number;
}
