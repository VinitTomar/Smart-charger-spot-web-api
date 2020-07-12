import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema({
  versionKey: false,
})
export class User extends Document {

  @Prop({
    required: true,
    unique: true
  })
  username: string;

  @Prop({
    required: true,
    unique: true
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