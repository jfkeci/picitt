import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FollowUserDto } from './dto/follow-user.dto';

@Injectable()
export class FollowersService {
  constructor(private readonly prisma: PrismaService) {}

  async followUser(data: FollowUserDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: data.user },
    });

    if (!user) throw new NotFoundException('No user found');

    const following = await this.prisma.users.findUnique({
      where: { id: data.following },
    });

    if (!following) throw new NotFoundException('No user found');

    const item = await this.prisma.followers.create({
      data: { follower: data.user, following: data.following },
    });

    if (!item) throw new BadRequestException('Failed to follow user');

    return item;
  }

  async unfollowUser(data: FollowUserDto) {
    const item = await this.prisma.followers.findFirst({
      where: { follower: data.user, following: data.following },
    });

    let deleted;

    if (item) {
      deleted = await this.prisma.followers.delete({
        where: { id: item.id },
      });
    }

    return deleted;
  }

  async getUserFollowers(userId: number) {
    const followers = await this.prisma.followers.findMany({
      where: { following: userId },
      include: {
        users_followers_followingTousers: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!followers) throw new NotFoundException('No followers found');

    return followers;
  }

  async getUserFollowing(userId: number) {
    const following = await this.prisma.followers.findMany({
      where: { following: userId },
      include: {
        users_followers_followerTousers: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!following) throw new NotFoundException('No users found');

    return following;
  }
}
