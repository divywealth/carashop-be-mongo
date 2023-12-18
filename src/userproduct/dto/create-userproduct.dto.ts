import { IsNotEmpty } from 'class-validator';
import { Size } from '../size.enum';

export class CreateUserproductDto {
  productId: string;

  @IsNotEmpty()
  size: Size;

  @IsNotEmpty()
  quantity: number;
}
