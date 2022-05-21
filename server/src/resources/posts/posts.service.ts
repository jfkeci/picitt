import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostDto) {
    const user = await this._findOne({ id: data.createdBy });

    if (!user) throw new NotFoundException('No user found');

    if (data.category) {
      const category = await this._findOne({ id: data.category });

      if (!category) throw new NotFoundException('No category found');
    }

    const newPost = await this.prisma.posts.create({
      data: {
        ...data,
        location: data.location ? { ...data.location } : {}
      }
    });

    if (!newPost) throw new BadRequestException('Failed to create new post');

    return newPost;
  }

  async findAll(filter?: Record<string, any> | null) {
    const posts = await this.prisma.posts.findMany({
      where: filter ?? {},
      include: {
        users: {
          select: {
            username: true
          }
        },
        categories: {
          select: { id: true, name: true }
        },
        post_likes: {
          include: {
            users: {
              select: { name: true }
            }
          }
        },
        comments: {
          select: {
            text: true
          }
        }
      }
    });

    if (!posts) throw new NotFoundException('No posts found');

    return posts;
  }

  async findOne(id: number) {
    const post = await this.prisma.posts.findUnique({ where: { id: id } });

    if (!post) throw new NotFoundException('No post found');

    return post;
  }

  async _findOne(filter: Record<string, any>) {
    return await this.prisma.posts.findUnique({ where: filter });
  }

  async _findAll(filter: Record<string, any>) {
    return await this.prisma.posts.findMany({ where: filter });
  }

  async update(id: number, data: UpdatePostDto) {
    const updatedPost = await this.prisma.posts.update({
      where: { id },
      data: { ...data, location: data.location ? { ...data.location } : null }
    });

    if (!updatedPost) throw new BadRequestException('Failed to update post');

    return updatedPost;
  }

  async remove(id: number) {
    const deletedPost = await this.prisma.posts.delete({ where: { id } });

    if (!deletedPost) throw new BadRequestException('Failed to delete post');

    return deletedPost;
  }
}
