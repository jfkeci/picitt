import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserIdParamDto } from 'src/interfaces/default-params.dto';
import { FollowUserDto } from './dto/follow-user.dto';
import { FollowersService } from './followers.service';

@Controller('')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}

  @Post('/follow')
  followUser(@Body() data: FollowUserDto) {
    return this.followersService.followUser(data);
  }

  @Delete('/unfollow')
  unfollowUser(@Body() data: FollowUserDto) {
    return this.followersService.unfollowUser(data);
  }

  @Get('/followers/:userId')
  getUserFollowers(@Param('userId') userId) {
    return this.followersService.getUserFollowers(Number(userId));
  }

  @Get('/following/:userId')
  getUserFollowing(@Param('userId') userId) {
    return this.followersService.getUserFollowing(Number(userId));
  }
}
