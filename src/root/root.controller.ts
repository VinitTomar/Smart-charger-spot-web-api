import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService, User } from 'src/schema';
import { JwtPayload } from 'src/types';
import { Request } from 'express';

@Controller('')
export class RootController {

  constructor(
    private readonly _usrServic: UserService
  ) { }

  @Get()
  getHello(): string {
    return 'Hello World!...';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async profileDetail(@Req() req: Request) {
    const payload: JwtPayload = {
      sub: req.user['_id']
    };
    const user: User = await this._usrServic.findById(payload.sub);
    return user.toJSON();
  }
}
