import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import mongoose from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { BadRequest } from 'src/Util/BadRequestResponse';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: mongoose.Model<Product>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const upload = await this.cloudinaryService.uploadImage(
      createProductDto.file,
    );
    console.log(upload.url);
    const information2Save = {
      name: createProductDto.name,
      designer: createProductDto.designer,
      img: upload.url,
      price: createProductDto.price,
    };
    const createProduct = new this.productModel(information2Save);
    return await createProduct.save();
  }

  findAll() {
    return this.productModel.find();
  }

  async findOne(id: string) {
    try {
      return await this.productModel.findById(id);
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.productModel.findOne({ _id: id });
    if (existingProduct) {
      if (updateProductDto.file) {
        const upload = await this.cloudinaryService.uploadImage(
          updateProductDto.file,
        );
        const updateFile = { img: upload.url };
        return this.productModel.findOneAndUpdate({ _id: id }, updateFile);
      }
      return this.productModel.findOneAndUpdate({ _id: id }, updateProductDto, {
        new: true,
        runValidators: true,
      });
    } else {
      throw BadRequest('Product was not found');
    }
  }

  async remove(id: string) {
    const existingProduct = await this.productModel.findOne({ _id: id });
    if (existingProduct) {
      return this.productModel.findOneAndDelete({ _id: id });
    } else {
      throw BadRequest("Product wasn't found");
    }
  }
}
