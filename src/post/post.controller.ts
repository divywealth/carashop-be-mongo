import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    try {
      return this.postService.create(createPostDto);
    } catch (error) {
      throw error.message
    }
  }

  @Get()
  findAll() {
    try {
      return this.postService.findAll();
    } catch (error) {
      throw error.message
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.postService.findOne(id);
    } catch (error) {
      throw error.message
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
