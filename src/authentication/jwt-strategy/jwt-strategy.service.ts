import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/types';
import { UserService } from 'src/schema';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private readonly _usrService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    const id = payload.sub;
    const currentUser = await this._usrService.findById(id);
    return currentUser.toJSON();
  }

}
