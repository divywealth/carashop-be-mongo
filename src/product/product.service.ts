import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import mongoose from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductService {

  constructor(
    @InjectModel(Product.name)
    private readonly productModel: mongoose.Model<Product>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create(createProductDto: CreateProductDto) {
    const upload = await this.cloudinaryService.uploadImage(createProductDto.file)
    console.log(upload.url)
    const information2Save = {
      name: createProductDto.name,
      designer: createProductDto.designer,
      img: upload.url,
      price: createProductDto.price,
    };
    const createProduct = new this.productModel(information2Save)
    return await createProduct.save()
  }

  findAll() {
    return this.productModel.find()
  }

  async findOne(id: string) {
    return await this.productModel.findById(id)
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
