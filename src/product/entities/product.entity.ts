import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Suborder } from 'src/suborder/entities/suborder.entity';
import { Userproduct } from 'src/userproduct/entities/userproduct.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  designer: string;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Userproduct'}]})
  userproducts: Userproduct[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Suborder'}]})
  suborders: Suborder[];

}

export const ProductSchema = SchemaFactory.createForClass(Product);