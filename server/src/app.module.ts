import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './resources/auth/auth.module';
import { UserModule } from './resources/user/user.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { PostsModule } from './resources/posts/posts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    CategoriesModule,
    PostsModule,
    ConfigModule.forRoot(),
  ],
})
export class AppModule {}
