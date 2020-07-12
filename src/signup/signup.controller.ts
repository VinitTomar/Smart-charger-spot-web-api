import { Controller, Post, Body } from '@nestjs/common';

import { User, UserService } from 'src/schema';
import { hash } from 'bcrypt';

@Controller('signup')
export class SignupController {
  constructor(
    private readonly _usrService: UserService
  ) { }

  @Post()
  async register(@Body() userDetail: User) {
    const saltRounds = 10;
    const passHash = await hash(userDetail.password, saltRounds);
    userDetail.password = passHash;
    const cretedUsr = await this._usrService.create(userDetail);
    return cretedUsr;
  }

}
