import { Controller, Post, Body } from '@nestjs/common';

import { User, UserService } from 'src/schema';

@Controller('signup')
export class SignupController {
  constructor(
    private readonly _usrService: UserService
  ) { }

  @Post()
  async register(@Body() userDetail: User) {
    const cretedUsr = await this._usrService.create(userDetail);
    return cretedUsr;
  }

}
