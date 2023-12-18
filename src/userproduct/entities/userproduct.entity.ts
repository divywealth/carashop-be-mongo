import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/schema/user.entity';
import { Size } from '../size.enum';

export type UserProductDocument = HydratedDocument<Userproduct>;

@Schema()
export class Userproduct {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true }) // Add the _id field
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref:  'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product;

  @Prop({ required: true })
  quantity: number;

  @Prop({ type: String, enum: Size })
  size: Size;
}

export const UserProductSchema = SchemaFactory.createForClass(Userproduct);
