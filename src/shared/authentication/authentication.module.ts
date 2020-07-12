import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './local-strategy/local-strategy.service';
import { TokenService } from './token/token.service';
import { JwtStrategy } from './jwt-strategy/jwt-strategy.service';
import { UserModule } from 'src/schema';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' }
    }),
    UserModule
  ],
  providers: [
    LocalStrategy,
    TokenService,
    JwtStrategy
  ],
  exports: [TokenService]
})
export class AuthenticationModule { }
