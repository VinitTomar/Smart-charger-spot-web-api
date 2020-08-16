import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
  versionKey: false,
  _id: false
})
export class Address extends Document {

  @Prop({
    required: true,
    maxlength: 250
  })
  line1: string;

  @Prop({
    required: true,
    maxlength: 250
  })
  line2: string;

  @Prop({
    required: true,
    maxlength: 100
  })
  landmark: string;

  @Prop({
    required: true,
    maxlength: 100
  })
  district: string;

  @Prop({
    required: true,
    maxlength: 100
  })
  state: string;

  @Prop({
    required: true,
    validate: {
      validator: function (v: string) {
        return /^[\d]{6}$/.test(v);
      },
      message: 'Invalid pincode'
    }
  })
  pincode: string;

}

const AddressSchema = SchemaFactory.createForClass(Address);
export { AddressSchema };
