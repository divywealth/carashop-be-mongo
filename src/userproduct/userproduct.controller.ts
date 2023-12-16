import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserproductService } from './userproduct.service';
import { CreateUserproductDto } from './dto/create-userproduct.dto';
import { UpdateUserproductDto } from './dto/update-userproduct.dto';

@Controller('userproduct')
export class UserproductController {
  constructor(private readonly userproductService: UserproductService) {}

  @Post()
  create(@Body() createUserproductDto: CreateUserproductDto) {
    return this.userproductService.create(createUserproductDto);
  }

  @Get()
  findAll() {
    return this.userproductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userproductService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserproductDto: UpdateUserproductDto) {
    return this.userproductService.update(+id, updateUserproductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userproductService.remove(+id);
  }
}
