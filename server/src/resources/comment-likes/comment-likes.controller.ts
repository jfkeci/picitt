import { Controller, Post, Body, Delete, Param, Get } from '@nestjs/common';
import { CommentIdParamDto } from 'src/interfaces/default-params.dto';
import { CommentLikesService } from './comment-likes.service';
import { LikeCommentDto } from './dto/like-comment.dto';

@Controller('comment-likes')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @Get('/:commentId')
  getCommentLikes(@Param() param: CommentIdParamDto) {
    return this.commentLikesService.getCommentLikes(param.commentId);
  }

  @Post()
  likeComment(@Body() data: LikeCommentDto) {
    return this.commentLikesService.likeComment(data);
  }

  @Delete()
  unlikeComment(@Body() data: LikeCommentDto) {
    return this.commentLikesService.deleteLike(data);
  }
}
