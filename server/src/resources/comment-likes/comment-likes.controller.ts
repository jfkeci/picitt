import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { LikeCommentDto } from './dto/like-comment.dto';

@Controller('comment-likes')
export class CommentLikesController {
  constructor(private readonly commentLikesService: CommentLikesService) {}

  @Post()
  likeComment(@Body() data: LikeCommentDto) {
    return this.commentLikesService.likeComment(data);
  }
}
