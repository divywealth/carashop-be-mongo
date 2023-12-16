import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "src/user/schema/user.entity";

export type VeificationDocument = HydratedDocument<Verification>

@Schema()
export class Verification {
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true})
    _id: string;

    @Prop({ required: true })
    verificationCode: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: () => User})
    user: User
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);
