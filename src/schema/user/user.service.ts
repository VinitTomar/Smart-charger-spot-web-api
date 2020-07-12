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

  async fintById(id: string) {
    const ids = Types.ObjectId(id);
    const usr = await this._userModel.findById(ids);
    return usr;
  }

}
