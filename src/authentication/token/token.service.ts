import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService
  ) { }

  getJwtToken(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
