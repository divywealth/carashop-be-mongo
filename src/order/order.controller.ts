import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { SuborderService } from 'src/suborder/suborder.service';
import { UserproductService } from 'src/userproduct/userproduct.service';
import { AddressService } from 'src/address/address.service';
import { Userproduct } from 'src/userproduct/entities/userproduct.entity';
import { BadRequest } from 'src/Util/BadRequestResponse';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private jwtService: JwtService,
    private userService: UserService,
    private readonly productService: ProductService,
    private readonly suborderService: SuborderService,
    private readonly userProductService: UserproductService,
    private readonly addressService: AddressService,
  ) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() request: Request,
  ) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedToken.user._id;
      const user = await this.userService.findOne(userId);
      const existingUserProducts: Userproduct[] =
        await this.userProductService.findUserProducts(user);
      if (existingUserProducts.length == 0) {
        return BadRequest("user doesn't have any product")
      }
      const deleteUserProduct = await this.userProductService.removeUserProducts(user);
      const savedAddress = await this.addressService.create(
        createOrderDto.address,
      );
      const address = await this.addressService.findOne(savedAddress._id);
      const savedOrder = await this.orderService.create(
        createOrderDto,
        user,
        address, 
      );
      const order = await this.orderService.findOne(savedOrder._id);
      for (let i = 0; i < existingUserProducts.length; i++) {
        const product = await this.productService.findOne(
          existingUserProducts[i].product._id,
        );
        const savedSubOrder = await this.suborderService.create(
          order,
          product,
          existingUserProducts[i].quantity,
          product.price,
          existingUserProducts[i].size,
        );
        const savedSubOrderProducts =
          await this.suborderService.findAllOrderProducts(savedOrder.id);
        return savedSubOrderProducts;
      }
    } catch (error) {
      throw error.message;
    }
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
