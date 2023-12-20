import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Order } from 'src/order/entities/order.entity';
import { Userproduct } from 'src/userproduct/entities/userproduct.entity';

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true})
  _id: string;

  @Prop({
    required: false,
  })
  firstName: string;

  @Prop({
    required: false,
  })
  lastName: string;

  @Prop({
    required: false,
  })
  email: string;

  @Prop({
    required: false,
  })
  phoneNo: string;

  @Prop({
    required: false,
  })
  password: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({ default: Date.now })
  updatedAt!: Date;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Userproduct' }]})
  userProducts: Userproduct[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order'}]})
  order: Order[];
}

export const UserSchema = SchemaFactory.createForClass(User);
