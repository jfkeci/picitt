import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikePostDto } from './dto/loke-post.dto';

@Injectable()
export class PostLikesService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(data: LikePostDto) {
    return 'a';
  }
}
