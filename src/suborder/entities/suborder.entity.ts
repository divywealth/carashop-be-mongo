import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

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

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const SubOrderSchema = SchemaFactory.createForClass(Suborder);
