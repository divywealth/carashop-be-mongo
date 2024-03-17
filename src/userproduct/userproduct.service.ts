import { Injectable } from '@nestjs/common';
import { CreateUserproductDto } from './dto/create-userproduct.dto';
import { UpdateUserproductDto } from './dto/update-userproduct.dto';
import { User } from 'src/user/schema/user.entity';
import { Userproduct } from './entities/userproduct.entity';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ProductService } from 'src/product/product.service';
import { BadRequest } from 'src/Util/BadRequestResponse';

@Injectable()
export class UserproductService {
  constructor(
    @InjectModel(Userproduct.name)
    private readonly userproductModel: mongoose.Model<Userproduct>,
    private readonly productService: ProductService,
  ) {}

  async create(createUserproductDto: CreateUserproductDto, user: User) {
    const product = await this.productService.findOne(
      createUserproductDto.productId,
    );
    const existingUserProduct = await this.userproductModel.findOne({
      user: user._id,
      product: product._id,
    });
    if (existingUserProduct) {
      throw BadRequest('User chosen product already');
    }
    const createUserProduct = new this.userproductModel({
      user: user,
      product: product,
      size: createUserproductDto.size,
      quantity: createUserproductDto.quantity,
    });
    return createUserProduct.save();
  }

  async findAll() {
    return this.userproductModel.find().populate('user', 'product').exec();
  }

  async findOne(id: string) {
    const existingUserProduct = this.userproductModel
      .findById(id)
      .populate('user', 'product')
      .exec();
    if (existingUserProduct) {
      return existingUserProduct;
    } else {
      throw BadRequest('UserProduct not found');
    }
  }

  async findUserProducts(user: User): Promise<Userproduct[]> {
    const existingUserProduct = await this.userproductModel
      .find({
        user: user._id,
      })
      .populate('product')
      .exec();
      console.log(existingUserProduct);
    if (existingUserProduct.length > 0) {
      console.log(existingUserProduct);
      return existingUserProduct;
    } else {
      throw BadRequest('user not found');
    }
  }

  update(id: string, updateUserproductDto: UpdateUserproductDto) {
    return `This action updates a #${id} userproduct`;
  }

  async remove(id: string) {
    return await this.userproductModel.findByIdAndDelete(id);
  }

  async removeUserProducts(user: User) {
    const userproduct = await this.userproductModel.deleteMany({
      user: user._id,
    });
    if (userproduct) {
      return userproduct;
    }

    throw BadRequest('No product for this user');
  }
}
