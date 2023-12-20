import { CreateAddressDto } from './../../address/dto/create-address.dto';
import { Status } from "../status.enum";

export class CreateOrderDto {
    userId: string;
    status: Status;
    address: CreateAddressDto;
  }
