import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'adi@gmail.com', description: 'Email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Password of the user' })
  @IsString()
  password: string;
}
