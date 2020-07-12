import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { UserModule } from 'src/schema';

@Module({
  imports: [UserModule],
  controllers: [SignupController]
})
export class SignupModule { }
