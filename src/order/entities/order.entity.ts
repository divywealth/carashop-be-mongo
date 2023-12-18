import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type OrderDocument = HydratedDocument<Order>

@Schema()
export class Order {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true})
    _id: string;

    
}

export const OrderSchema = SchemaFactory.createForClass(Order)