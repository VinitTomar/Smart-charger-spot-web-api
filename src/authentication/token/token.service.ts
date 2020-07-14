import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService
  ) { }

  getJwtToken(payload: JwtPayload): string {
    // console.log({ jwtKey: process.env.JWT_SECRET_KEY })
    return this.jwtService.sign(payload);
  }
}
