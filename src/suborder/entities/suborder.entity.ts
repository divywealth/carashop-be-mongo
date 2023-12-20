import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

export type SubOrderDocument = HydratedDocument<Suborder>;

@Schema()
export class Suborder {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop()
  quantity: number;

  @Prop()
  amount: number;

  @Prop()
  size: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Order'})
  order: Order;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
  product: Product;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const SubOrderSchema = SchemaFactory.createForClass(Suborder);
