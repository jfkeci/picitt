import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdParamDto } from 'src/interfaces/default-params.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:userId')
  findOne(@Param() param: UserIdParamDto) {
    return this.userService.findOne({ id: Number(param.userId) });
  }

  @Get('/:userId/posts')
  getUserPosts(@Param() param: UserIdParamDto) {
    return this.userService.getUserPosts({ id: Number(param.userId) });
  }

  @Patch(':userId')
  update(@Param() param: UserIdParamDto, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(Number(param.userId), updateUserDto);
  }

  @Delete(':userId')
  remove(@Param() param: UserIdParamDto) {
    return this.userService.remove(Number(param.userId));
  }
}
