import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import mongoose from 'mongoose';
import { Address } from 'src/address/entities/address.entity';
import { User } from 'src/user/schema/user.entity';
import { BadRequest } from 'src/Util/BadRequestResponse';

@Injectable()
export class OrderService {

  constructor (
    @InjectModel(Order.name)
    private readonly orderModel: mongoose.Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: User, address: Address) {
    try {
      const creatOrder = new this.orderModel({
        user: user,
        status: createOrderDto.status,
        address: address,
      })
      return await creatOrder.save()
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all order`;
  }

  async findOne(id: string) {
    try {
      const existingOrder = await this.orderModel.findById(id)
      if (existingOrder) {
        return existingOrder
      }
      return BadRequest("order not found")
    } catch (error) {
      throw error
    }
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
