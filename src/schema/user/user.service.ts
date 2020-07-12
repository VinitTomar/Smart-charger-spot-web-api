import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

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
    return this._userMode.findOne({ _id: id });
  }

}
