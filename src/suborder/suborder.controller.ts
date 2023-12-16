import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuborderService } from './suborder.service';
import { CreateSuborderDto } from './dto/create-suborder.dto';
import { UpdateSuborderDto } from './dto/update-suborder.dto';

@Controller('suborder')
export class SuborderController {
  constructor(private readonly suborderService: SuborderService) {}

  @Post()
  create(@Body() createSuborderDto: CreateSuborderDto) {
    return this.suborderService.create(createSuborderDto);
  }

  @Get()
  findAll() {
    return this.suborderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suborderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuborderDto: UpdateSuborderDto) {
    return this.suborderService.update(+id, updateSuborderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suborderService.remove(+id);
  }
}
