import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: '"username" should be a valid string' })
  @IsOptional()
  username?: string;

  @IsString({ message: '"email" should be a valid string' })
  @IsOptional()
  email?: string;

  @IsString({ message: '"password" should be a valid string' })
  @Length(8, 125)
  @IsNotEmpty()
  password: string;
}
