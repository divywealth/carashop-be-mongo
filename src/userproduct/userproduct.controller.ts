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
import { UserproductService } from './userproduct.service';
import { CreateUserproductDto } from './dto/create-userproduct.dto';
import { UpdateUserproductDto } from './dto/update-userproduct.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Controller({
  version: '1'
})
export class UserproductController {
  constructor(
    private readonly userproductService: UserproductService,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Body() createUserproductDto: CreateUserproductDto,
    @Req() request: Request,
  ) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedToken.user._id;
      const user = await this.userService.findOne(userId);
      return this.userproductService.create(createUserproductDto, user);
    } catch (error) {
      throw error.message;
    }
  }

  @Get()
  findAll() {
    try {
      return this.userproductService.findAll();
    } catch (error) {
      throw error.message;
    }
  }

  @Get('userproduct/:id')
  findOne(@Param('id') id: string) {
    try {
      return this.userproductService.findOne(id);
    } catch (error) {
      throw error.message;
    }
  }

  @Get('users/:userId/products')
  async findUserProducts(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const newdecodeToken = decodedToken.user._id;
      userId = newdecodeToken;
      const user = await this.userService.findOne(newdecodeToken);
      return this.userproductService.findUserProducts(user)
    } catch (error) {
      
    }
  }

  @Patch('userproduct/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserproductDto: UpdateUserproductDto,
  ) {
    try {
      return this.userproductService.update(id, updateUserproductDto);
    } catch (error) {
      throw error.message;
    }
  }

  @Delete('userproducts')
  async removeUserProducts(@Req() request: Request) {
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const decodedToken = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decodedToken.user._id;
      const user = await this.userService.findOne(userId);
      return this.userproductService.removeUserProducts(user)
    } catch (error) {
      throw error.message
    }
  }

  @Delete('userproduct/:id')
  remove(@Param('id') id: string) {
    try {
      return this.userproductService.remove(id);
    } catch (error) {
      throw error.message;
    }
  }
}
