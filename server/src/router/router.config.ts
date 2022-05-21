import { AuthModule } from 'src/resources/auth/auth.module';
import { CategoriesModule } from 'src/resources/categories/categories.module';
import { CommentLikesModule } from 'src/resources/comment-likes/comment-likes.module';
import { CommentsModule } from 'src/resources/comments/comments.module';
import { FollowersModule } from 'src/resources/followers/followers.module';
import { PostLikesModule } from 'src/resources/post-likes/post-likes.module';
import { PostsModule } from 'src/resources/posts/posts.module';
import { UserModule } from 'src/resources/user/user.module';

export const routerConfig = [
  {
    path: 'user',
    module: UserModule,
    children: [
      {
        path: 'followers',
        module: FollowersModule
      }
    ]
  },
  {
    path: 'posts',
    module: PostsModule,
    children: [
      {
        path: ':postId/comments',
        module: CommentsModule,
        children: [
          {
            path: 'likes',
            module: CommentLikesModule
          }
        ]
      }
    ]
  },
  {
    path: 'categories',
    module: CategoriesModule
  },
  {
    path: 'auth',
    module: AuthModule
  }
];
