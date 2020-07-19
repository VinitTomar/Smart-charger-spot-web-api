import { Controller, UseGuards, Get, Req, Put, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { User, UserService } from 'src/schema';


@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {

  constructor(
    private readonly _usrServic: UserService
  ) { }

  @Get()
  async profileDetail(@Req() req: Request) {
    const user = (req.user as User);
    return user;
  }

  @Put()
  async updateProfile(@Req() req: Request, @Body() detail: User) {
    const currentUsr = (req.user as User);
    detail.id = currentUsr._id;
    const updated = await this._usrServic.update(detail);
    return updated;
  }
}
