import { Controller, Post, Body } from '@nestjs/common';

import { User, UserService } from '../schema';
import { TokenService } from '../authentication';
import { JwtPayload } from 'src/types';

@Controller('signup')
export class SignupController {
  constructor(
    private readonly _usrService: UserService,
    private readonly _tknService: TokenService
  ) { }

  @Post()
  async register(@Body() userDetail: User) {
    userDetail.isAdmin = false;
    const cretedUsr = await this._usrService.create(userDetail);
    const payload: JwtPayload = {
      sub: cretedUsr._id
    }
    return { token: this._tknService.getJwtToken(payload) };
  }

}
