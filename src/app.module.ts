import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://looner_user:fordwinwam@loonercluster.oj3oeqg.mongodb.net/carashop-local?retryWrites=true&w=majority'),
    UserModule,
    PostModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
