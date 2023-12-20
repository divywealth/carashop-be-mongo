import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  phoneNo: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
