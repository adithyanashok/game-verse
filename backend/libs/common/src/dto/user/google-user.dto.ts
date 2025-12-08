import { IsNotEmpty } from 'class-validator';

export class GoogleUserDto {
  @IsNotEmpty()
  token: string;
}
