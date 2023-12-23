import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file-upload-dto';

@Controller({
  version: '1'
})
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'some description',
    type: FileUploadDto,
  })

  @UseInterceptors(FileInterceptor('file'))

  @Post('product')
  @UsePipes(ValidationPipe)
  create(@Body() body, @UploadedFile() file: Express.Multer.File) {
    try {
      const createProductDto: CreateProductDto = {
        name: body.name,
        designer: body.designer,
        file: file,
        img: body.img,
        price: body.price,
      }
      return this.productService.create(createProductDto);
    } catch (error) {
      throw error.message
    }
  }

  @Get('products')
  findAll() {
    try {
      return this.productService.findAll();
    } catch (error) {
      throw error.message
    }
  }

  @Get('product/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.productService.findOne(id);
    } catch (error) {
      throw error.message
    }
  }

  @Patch('product/:id')
  @UseInterceptors(FileInterceptor('file'))
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,  @UploadedFile() file: Express.Multer.File) {
    try {
      return this.productService.update(id, updateProductDto);
    } catch (error) {
      throw error.message
    }
  }

  @Delete('product/:id')
  remove(@Param('id') id: string) {
    try {
      return this.productService.remove(id);
    } catch (error) {
      throw error.message
    }
  }
}
