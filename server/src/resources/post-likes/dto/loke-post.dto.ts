import { IsNotEmpty, IsNumber } from 'class-validator';

export class LikePostDto {
  @IsNumber()
  @IsNotEmpty()
  postId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
