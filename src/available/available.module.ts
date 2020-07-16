import { Module } from '@nestjs/common';
import { AvailableController } from './available.controller';
import { UserModule } from 'src/schema';

@Module({
  imports: [UserModule],
  controllers: [AvailableController]
})
export class AvailableModule { }
