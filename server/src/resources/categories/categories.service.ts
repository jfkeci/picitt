import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const category = await this.prisma.categories.create({ data: { ...data } });

    if (!category) throw new BadRequestException('Failed to create category');

    return category;
  }

  filterCategories() {
    return `This action returns all categories`;
  }
}
