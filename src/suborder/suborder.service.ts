import { Injectable } from '@nestjs/common';
import { CreateSuborderDto } from './dto/create-suborder.dto';
import { UpdateSuborderDto } from './dto/update-suborder.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Suborder } from './entities/suborder.entity';
import mongoose from 'mongoose';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { BadRequest } from 'src/Util/BadRequestResponse';

@Injectable()
export class SuborderService {
  constructor(
    @InjectModel(Suborder.name)
    private readonly suborderModel: mongoose.Model<Suborder>,
  ) {}

  async create(
    order: Order,
    product: Product,
    quantity: number,
    price: number,
    size: string,
  ) {
    try {
      const createSubOrder = new this.suborderModel({
        order: order,
        product: product,
        quantity: quantity,
        amount: price * quantity,
        size: size,
      });
      return await createSubOrder.save();
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.suborderModel.find();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} suborder`;
  }

  async findAllOrderProducts(orderId: string) {
    try {
      const existingOrderProducts = await this.suborderModel.find({
        order: orderId,
      }).populate('product', 'order');
      if (existingOrderProducts) {
        return existingOrderProducts
      } else {
        return BadRequest("orderId dosen't exist")
      }
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateSuborderDto: UpdateSuborderDto) {
    return `This action updates a #${id} suborder`;
  }

  remove(id: number) {
    return `This action removes a #${id} suborder`;
  }
}
