import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { CommentIdParamDto } from 'src/interfaces/default-params.dto';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get('/:commentId')
  findOne(@Param() param: CommentIdParamDto) {
    return this.commentsService.findOne(param.commentId);
  }

  @Patch('/:commentId')
  update(
    @Param() param: CommentIdParamDto,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    return this.commentsService.update(param.commentId, updateCommentDto);
  }

  @Delete('/:commentId')
  remove(@Param() param: CommentIdParamDto) {
    return this.commentsService.remove(param.commentId);
  }
}
