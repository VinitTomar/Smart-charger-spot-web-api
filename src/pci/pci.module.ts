import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PciController } from './pci.controller';
import { AuthenticationModule } from 'src/authentication';
import { PciChargerOptionModule } from 'src/schema';
import { Pci, PciSchema } from './pci.schema';
import { PciService } from './pci.service';
import { BookingModule } from 'src/booking/booking.module';


@Module({
  controllers: [PciController],
  imports: [
    AuthenticationModule,
    PciChargerOptionModule,
    BookingModule,
    MongooseModule.forFeature([
      { name: Pci.name, schema: PciSchema }
    ])
  ],
  providers: [PciService]
})
export class PciModule { }
