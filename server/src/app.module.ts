import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { PostsModule } from './resources/posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { PostLikesModule } from './resources/post-likes/post-likes.module';
import { CommentLikesModule } from './resources/comment-likes/comment-likes.module';
import { CommentsModule } from './resources/comments/comments.module';
import { FollowersModule } from './resources/followers/followers.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    CategoriesModule,
    PostsModule,
    ConfigModule.forRoot(),
    PostLikesModule,
    CommentLikesModule,
    CommentsModule,
    FollowersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
