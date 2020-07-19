import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { AuthenticationModule } from 'src/authentication';
import { UserModule } from 'src/schema';

@Module({
  controllers: [ProfileController],
  imports: [
    AuthenticationModule,
    UserModule
  ]
})
export class ProfileModule { }
