import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Post } from '../../post/schema/post.entity';

@Schema()
export class User extends Document {
  @Prop() 
  username: string;

  @Prop({ type: [{ type: 'ObjectId', ref: 'Post' }] })
  posts: Post[]; 
}

export const UserSchema = SchemaFactory.createForClass(User);
