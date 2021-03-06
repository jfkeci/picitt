import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikePostDto } from './dto/like-post.dto';

@Injectable()
export class PostLikesService {
  constructor(private readonly prisma: PrismaService) {}

  async likePost(data: LikePostDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: data.userId },
    });

    if (!user) throw new NotFoundException('No user found');

    const post = await this.prisma.posts.findUnique({
      where: { id: data.postId },
    });

    if (!post) throw new NotFoundException('No post found');

    const newLike = await this.prisma.post_likes.create({ data: data });

    if (!newLike) throw new BadRequestException('Failed to save like');

    return await this.getPostLikes(data.postId);
  }

  async deleteLike(data: LikePostDto) {
    const likes = await this.prisma.post_likes.deleteMany({
      where: { userId: data.userId, postId: data.postId },
    });

    if (!likes) throw new NotFoundException('Failed unliking post');

    return await this.getPostLikes(likes[0]['postId']);
  }

  async getLikeCount(id: number) {
    const count = await this.prisma.post_likes.count({ where: { id } });

    if (!count) throw new BadRequestException('Failed to get like count');

    return count;
  }

  async getPostLikes(id: number) {
    const likes = await this.prisma.post_likes.findMany({
      where: { id },
      include: {
        users: {
          select: {
            username: true,
          },
        },
      },
    });

    return {
      likes,
      count: likes.length,
    };
  }
}
