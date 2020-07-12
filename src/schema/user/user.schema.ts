import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {

  @Prop()
  _id: Types.ObjectId;

  @Prop({
    required: true
  })
  username: string;

  @Prop({
    required: true
  })
  email: string;

  @Prop({
    required: true
  })
  fullName: string;

  @Prop({
    required: true
  })
  password: string;

  @Prop({
    required: true
  })
  isAdmin: boolean;

}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

export { UserSchema };