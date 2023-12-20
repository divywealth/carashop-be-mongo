import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './entities/address.entity';
import mongoose from 'mongoose';
import { BadRequest } from 'src/Util/BadRequestResponse';

@Injectable()
export class AddressService {

  constructor (
    @InjectModel(Address.name)
    private readonly addressModel: mongoose.Model<Address>
  ) {}

  create(createAddressDto: CreateAddressDto) {
    try {
      const createAddress = new this.addressModel(createAddressDto)
      return createAddress.save()
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all address`;
  }

  async findOne(id: string) {
    try {
      const existingAddress = await this.addressModel.findById({id: id})
      if (existingAddress) {
        return existingAddress
      }
      throw BadRequest('address not found')
    } catch (error) {
      throw error
    }
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
