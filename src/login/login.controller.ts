import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { TokenService } from 'src/shared';
import { JwtPayload } from 'src/types';


@Controller('login')
export class LoginController {

  constructor(
    private _tknSer: TokenService
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post()
  async authenticate(@Req() req: any) {
    const payload: JwtPayload = {
      sub: req.user._id
    };
    return { token: this._tknSer.getJwtToken(payload) };
  }

}
