import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService, User } from 'src/schema';
import { JwtPayload } from 'src/types';

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
  async profileDetail(@Req() req: any) {
    const payload: JwtPayload = req.user;
    const user: User = await this._usrServic.fintById(payload.sub);
    return user.toJSON();
  }
}
