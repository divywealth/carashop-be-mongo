import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schema/post.entity';
import { Model } from 'mongoose';

@Injectable()
export class PostService {

  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>
  ) {}

  create(createPostDto: CreatePostDto) {
    try {
      const createdPost = new this.postModel(createPostDto)
      return createdPost.save()
    } catch (error) {
      throw error
    }
  }

  findAll() {
    try {
      return this.postModel.find().populate('user').exec()
    } catch (error) {
      throw error
    }
  }

  findOne(id: string) {
    try {
      return this.postModel.findById(id).exec()
    } catch (error) {
      throw error
    }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
