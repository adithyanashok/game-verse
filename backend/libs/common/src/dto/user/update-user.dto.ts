import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'Adithyan', description: 'Name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Passsionate Gamer', description: 'Bio of the user' })
  @IsString()
  bio: string;
}
