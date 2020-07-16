import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from 'src/schema';
import { CheckFor } from './check-for.type';

@Controller('available')
export class AvailableController {

  constructor(
    private readonly _usrService: UserService
  ) { }

  @Get(':checkFor/:value')
  async isAvailable(@Param('checkFor') chkFr: CheckFor, @Param('value') value: string) {

    switch (chkFr) {
      case 'username':
        return this.isUsernameAvailable(value);
      case 'email':
        return this.isEmailAvailable(value);
    }
  }

  private async isUsernameAvailable(username: string) {
    const available = ! await this._usrService.findByUsername(username);
    return { available };
  }


  private async isEmailAvailable(email: string) {
    const available = ! await this._usrService.findByEmail(email);
    return { available };
  }

}
