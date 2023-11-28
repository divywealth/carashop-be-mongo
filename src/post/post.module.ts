import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post, PostSchema } from './schema/post.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
