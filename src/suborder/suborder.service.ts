import { Injectable } from '@nestjs/common';
import { CreateSuborderDto } from './dto/create-suborder.dto';
import { UpdateSuborderDto } from './dto/update-suborder.dto';

@Injectable()
export class SuborderService {
  create(createSuborderDto: CreateSuborderDto) {
    return 'This action adds a new suborder';
  }

  findAll() {
    return `This action returns all suborder`;
  }

  findOne(id: number) {
    return `This action returns a #${id} suborder`;
  }

  update(id: number, updateSuborderDto: UpdateSuborderDto) {
    return `This action updates a #${id} suborder`;
  }

  remove(id: number) {
    return `This action removes a #${id} suborder`;
  }
}
