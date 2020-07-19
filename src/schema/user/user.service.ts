import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { User } from './user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly _userModel: Model<User>
  ) { }

  async create(detail: User) {
    return this._userModel.create(detail);
  }

  async findByUsername(username: string) {
    return this._userModel.findOne({ username });
  }

  async findById(id: string) {
    const _id = Types.ObjectId(id);
    const usr = await this._userModel.findById(_id);
    return usr;
  }

  async findByEmail(email: string) {
    return this._userModel.findOne({ email });
  }

  async update(detail: User) {
    const usr = await this.findById(detail.id);
    usr.set('password', detail.password);
    usr.set('fullname', detail.fullname);
    return usr.save();
  }

}
