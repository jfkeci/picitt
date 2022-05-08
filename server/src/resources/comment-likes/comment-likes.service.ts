import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeCommentDto } from './dto/like-comment.dto';

@Injectable()
export class CommentLikesService {
  constructor(private readonly prisma: PrismaService) {}

  async likeComment(data: LikeCommentDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: data.userId },
    });

    if (!user) throw new NotFoundException('No user found');

    const comment = await this.prisma.comments.findUnique({
      where: { id: data.commentId },
    });

    if (!comment) throw new NotFoundException('No comment found');

    const newLike = await this.prisma.comment_likes.create({ data: data });

    if (!newLike) throw new BadRequestException('Failed to save like');

    return newLike;
  }

  async deleteLike(id: number) {
    const like = await this.prisma.comment_likes.delete({ where: { id } });

    if (!like) throw new NotFoundException('Failed unliking comment');

    return await this.getCommentLikes(like.commentId);
  }

  async getCommentLikes(commentId: number) {
    const likes = await this.prisma.comment_likes.findMany({
      where: { commentId: commentId },
      include: { users: true },
    });

    return likes;
  }
}
