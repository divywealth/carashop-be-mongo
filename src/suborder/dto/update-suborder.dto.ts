import { PartialType } from '@nestjs/swagger';
import { CreateSuborderDto } from './create-suborder.dto';

export class UpdateSuborderDto extends PartialType(CreateSuborderDto) {}
