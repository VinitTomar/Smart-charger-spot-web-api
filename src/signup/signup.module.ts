import { Module } from '@nestjs/common';

import { SignupController } from './signup.controller';
import { UserModule } from '../schema';
import { AuthenticationModule } from '../authentication';

@Module({
  imports: [
    UserModule,
    AuthenticationModule
  ],
  controllers: [SignupController]
})
export class SignupModule { }
