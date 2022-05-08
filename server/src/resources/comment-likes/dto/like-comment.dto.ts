import { IsNotEmpty, IsNumber } from 'class-validator';

export class LikeCommentDto {
  @IsNumber()
  @IsNotEmpty()
  commentId: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
