import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, Types } from 'mongoose';

import { User } from './user.schema';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly _userMode: Model<User>
  ) { }

  async findByUsername(username: string) {
    return this._userMode.findOne({ username });
  }

  async fintById(id: string) {
    const ids = Types.ObjectId(id);
    const usr = await this._userMode.findById(ids);
    return usr;
  }

}
