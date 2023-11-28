import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    try {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    try {
      return this.userModel.find().populate('posts').exec();
    } catch (error) {
      throw error;
    }
  }

  findOne(id: string) {
    try {
      return this.userModel.findById(id).populate('posts').exec();
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
