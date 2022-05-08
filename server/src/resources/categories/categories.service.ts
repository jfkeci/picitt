import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: Number(data.createdBy) },
    });

    if (!user) {
      throw new NotFoundException('No user found');
    }

    const category = await this.prisma.categories.create({
      data: { ...data },
    });

    if (!category) throw new BadRequestException('Failed to create category');

    return category;
  }

  async filterCategories(search: string) {
    return await this.prisma.categories.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });
  }

  async getCategoryPosts(categoryId: number) {
    const categoryWithPosts = await this.prisma.categories.findUnique({
      where: { id: categoryId },
      include: { posts: true },
    });

    if (!categoryWithPosts) throw new NotFoundException('Not found');

    return categoryWithPosts;
  }
}
