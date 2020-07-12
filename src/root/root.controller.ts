import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('')
export class RootController {
  @Get()
  getHello(): string {
    return 'Hello World!...';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  profileDetail(@Req() req: any) {
    return req.user;
  }
}
