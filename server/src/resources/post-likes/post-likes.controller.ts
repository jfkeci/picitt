import { Controller, Post, Body } from '@nestjs/common';
import { PostLikesService } from './post-likes.service';
import { LikePostDto } from './dto/like-post.dto';

@Controller('post-likes')
export class PostLikesController {
  constructor(private readonly postLikesService: PostLikesService) {}

  @Post()
  create(@Body() data: LikePostDto) {
    return this.postLikesService.likePost(data);
  }
}
