import { Injectable } from '@nestjs/common';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Verification } from './entities/verification.entity';
import mongoose from 'mongoose';

@Injectable()
export class VerificationService {

  constructor(
    @InjectModel(Verification.name)
    private verificationModel: mongoose.Model<Verification>,
  ) {}

  async create(user: string, verificationCode: string): Promise<Verification | null> {
    try {
      const createdVerification = new this.verificationModel({
        user: user,
        verificationCode: verificationCode,
      })
      return await createdVerification.save()
    } catch (error) {
      throw error;
    }
  }

  async findAll(): Promise<Verification[] | null> {
    try {
      return await this.verificationModel
        .find()
        .populate('user', '-__v')
        .select('-__v');
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Verification | null> {
    try {
      return await this.verificationModel.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async removeUserVerification(user: string) {
    try {
      return await this.verificationModel.findOneAndDelete({ user: user })
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateVerificationDto: UpdateVerificationDto) {
    return `This action updates a #${id} verification`;
  }

  remove(id: number) {
    return `This action removes a #${id} verification`;
  }
}
