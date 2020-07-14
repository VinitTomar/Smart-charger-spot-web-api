import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { compare } from 'bcrypt';

import { UserService, User } from 'src/schema';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _usrService: UserService) {
    super();
  }

  async validate(username: string, password: string) {
    const usr: User = await this._usrService.findByUsername(username);
    if (!usr) {
      throw new UnauthorizedException('Account does not exist.');
    }

    const passwordMatched: boolean = await compare(password, usr.password);
    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid password.');
    }

    return usr.toJSON();
  }
}
