import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DefaultIdParamDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class UserIdParamDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
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
