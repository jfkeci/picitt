import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class VerifyEmailDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString({ message: '"token" should be a valid string' })
  @IsNotEmpty()
  token: string;
}
