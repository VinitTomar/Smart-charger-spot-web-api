import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HookNextFunction, HookSyncCallback } from 'mongoose';

import mongooseUniqueValidator = require("mongoose-unique-validator");
import { hash } from 'bcrypt';

@Schema({
  versionKey: false,
  toJSON: {
    transform: (doc: any, ret: any) => {
      delete ret.password;
    }
  }
})
export class User extends Document {

  @Prop({
    required: true,
    trim: true,
    unique: true,
    maxlength: 255,
    validate: {
      validator: /^[\w]+$/,
      message: 'Invalid username. Only alphanumeric, with underscore, allowed.',
      type: 'Pattern'
    }
  })
  username: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
    maxlength: 255,
    validate: {
      validator: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      message: 'Invalid email.',
      type: 'Pattern'
    }
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: 255,
    validate: {
      validator: /^[a-zA-Z ]+$/,
      message: 'Invalid fullName. Only alphabets, with space, allowed.',
      type: 'Pattern'
    }
  })
  fullname: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  })
  password: string;

  @Prop()
  isAdmin: boolean;

}

const passHashFunc: HookSyncCallback<User> = async function (next: HookNextFunction) {
  const saltRounds: number = +process.env.BCRYPT_SALT_CYCLES;
  const passHash = await hash(this.password, saltRounds);
  this.password = passHash;
  next();
}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre<User>('save', passHashFunc);
UserSchema.plugin(mongooseUniqueValidator, { type: 'unique' });

export { UserSchema };