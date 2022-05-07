import { IsNotEmpty, IsNumber } from 'class-validator';

export class DefaultIdParamDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class UserIdParamDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class PostIdParamDto {
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}

export class CommentIdParamDto {
  @IsNumber()
  @IsNotEmpty()
  commentId: number;
}

export class CategoryIdParamDto {
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
