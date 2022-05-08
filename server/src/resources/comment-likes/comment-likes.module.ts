import { Module } from '@nestjs/common';
import { CommentLikesService } from './comment-likes.service';
import { CommentLikesController } from './comment-likes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CommentLikesController],
  providers: [CommentLikesService],
})
export class CommentLikesModule {}
