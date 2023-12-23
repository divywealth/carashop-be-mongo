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
  
  async findAll() {
    try {
      return await this.userModel
        .find()
    } catch (error) {
      console.error('Error finding all users:', error.message);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return await this.userModel
        .findById(id)
    } catch (error) {
      console.error('Error finding all users:', error.message);
      throw error;
    }
  }
}
