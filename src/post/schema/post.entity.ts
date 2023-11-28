import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types} from 'mongoose'
import { User } from '../../user/schema/user.entity';
@Schema()
export class Post extends Document{
  @Prop()
  content: string;

  // Additional post fields...

  // Reference to the User model
  @Prop({ type: 'ObjectId', ref: 'User' })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
