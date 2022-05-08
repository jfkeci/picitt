import { IsNotEmpty, IsNumber } from 'class-validator';

export class FollowUserDto {
  @IsNumber()
  @IsNotEmpty()
  user: number;

  @IsNumber()
  @IsNotEmpty()
  following: number;
}
