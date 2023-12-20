import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Status } from '../status.enum';
import { User } from 'src/user/schema/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Suborder } from 'src/suborder/entities/suborder.entity';
import { Address } from 'src/address/entities/address.entity';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ type: String, enum: Status, default: 'New' })
  status: Status;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suborder'}]})
  suborders: Suborder[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address'})
  address: Address;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
