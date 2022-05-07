import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyEmailDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString({ message: '"token" should be a valid string' })
  @IsNotEmpty()
  token: string;
}
