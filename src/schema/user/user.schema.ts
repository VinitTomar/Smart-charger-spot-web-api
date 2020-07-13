import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongooseUniqueValidator = require("mongoose-unique-validator");
import { hash } from 'bcrypt';

@Schema({
  versionKey: false,
  toJSON: {
    transform: (doc: any, ret: any) => {
      delete ret.password;
    }
  },
})
export class User extends Document {

  @Prop({
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: /^[\w ]+$/,
      message: 'Invalid username. Only alphanumeric, with space & underscore, allowed.',
      type: 'Invalid'
    }
  })
  username: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
      message: 'Invalid email.',
      type: 'Invalid'
    }
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
    validate: {
      validator: /^[a-zA-Z ]+$/,
      message: 'Invalid fullName. Only alphabets, with space, allowed.',
      type: 'Invalid'
    }
  })
  fullName: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255
  })
  password: string;

  @Prop({
    required: true
  })
  isAdmin: boolean;

}

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre<User>('save', async function () {
  const saltRounds: number = +process.env.BCRYPT_SALT_CYCLES;
  const passHash = await hash(this.password, saltRounds);
  this.password = passHash;
  return;
});
UserSchema.plugin(mongooseUniqueValidator, { type: 'unique' });

export { UserSchema };