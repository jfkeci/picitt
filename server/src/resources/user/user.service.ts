import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    if (process.env.NODE_ENV === 'development') {
      let existingUser = await this._findByEmail(data.email);

      if (existingUser) throw new ConflictException('Email taken');

      existingUser = await this._findByUsername(data.username);

      if (existingUser) throw new ConflictException('Username taken');

      data.password = await bcrypt.hash(data.password, 10);

      const newUser = await this._createOne(data);

      if (!newUser) throw new BadRequestException('Failed to create new user');

      return newUser;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(query: Record<string, any>) {
    return await this.prisma.users.findUnique({ where: query });
  }

  async getUserPosts(query: Record<string, any>) {
    return await this.prisma.users.findUnique({
      where: query,
      include: { posts: { include: { comments: true } } }
    });
  }

  async update(id: number, data: UpdateUserDto) {
    const user = await this.prisma.users.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('No user found');

    if (data.username) {
      let existingUser = await this._findByUsername(data.username);

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Username taken');
      }
    }

    if (data.email) {
      let existingUser = await this._findByEmail(data.email);

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email taken');
      }
    }

    const updatedUser = await this.prisma.users.update({
      where: { id },
      data: {
        ...data
      }
    });

    if (!updatedUser) throw new BadRequestException('Failed to update user');

    return updatedUser;
  }

  async _findById(id: number) {
    return await this._findUniqueByQuery({ id });
  }

  async _findByEmail(email: string) {
    return await this._findUniqueByQuery({ email });
  }

  async _findByUsername(username: string) {
    return await this._findUniqueByQuery({ username });
  }

  async _findUniqueByQuery(query: Record<string, any>) {
    return await this.prisma.users.findUnique({ where: query });
  }

  async _findFirstByQuery(query: Record<string, any>) {
    return await this.prisma.users.findFirst({ where: query });
  }

  async _createOne(data: CreateUserDto) {
    return await this.prisma.users.create({ data: { ...data } });
  }

  async _updateOne(filter: Record<string, any>, query: Record<string, any>) {
    return await this.prisma.users.update({
      where: filter,
      data: query
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
