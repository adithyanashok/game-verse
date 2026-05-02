import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Adithyan',
    description: 'Name of the user',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'Passsionate Gamer',
    description: 'Bio of the user',
    required: false,
    nullable: true,
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({
    example:
      'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Ella%20Green&backgroundColor=b6e3f4,c0aede,d1d4f9&radius=50&size=128',
    description: 'Profile image of user',
    required: false,
    nullable: true,
    type: String,
  })
  @IsOptional()
  @IsString()
  profileImage?: string;
}
