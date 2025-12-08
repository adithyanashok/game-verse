import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Adithyan', description: 'Name of the user' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Passsionate Gamer', description: 'Bio of the user' })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({ example: 'adi@gmail.com', description: 'Email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Password of the user' })
  @IsString()
  @IsOptional()
  password?: string;
}
