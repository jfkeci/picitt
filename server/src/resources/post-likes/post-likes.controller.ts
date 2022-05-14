import { Controller, Post, Body, Delete, Get, Param } from '@nestjs/common';
import { PostLikesService } from './post-likes.service';
import { LikePostDto } from './dto/like-post.dto';
import { PostIdParamDto } from 'src/interfaces/default-params.dto';

@Controller('post-likes')
export class PostLikesController {
  constructor(private readonly postLikesService: PostLikesService) {}

  @Get('/:postId')
  getCommentLikes(@Param() param: PostIdParamDto) {
    return this.postLikesService.getPostLikes(param.postId);
  }

  @Post()
  likeComment(@Body() data: LikePostDto) {
    return this.postLikesService.likePost(data);
  }

  @Delete()
  unlikeComment(@Body() data: LikePostDto) {
    return this.postLikesService.deleteLike(data);
  }
}
