import { Module } from '@nestjs/common';

import { LoginController } from './login.controller';
import { AuthenticationModule } from '../authentication';



@Module({
  imports: [AuthenticationModule],
  controllers: [LoginController],
  providers: []
})
export class LoginModule { }
