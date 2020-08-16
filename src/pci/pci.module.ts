import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PciController } from './pci.controller';
import { AuthenticationModule } from 'src/authentication';
import { PciChargerOptionModule } from 'src/schema';
import { Pci, PciSchema } from './pci.schema';
import { PciService } from './pci.service';


@Module({
  controllers: [PciController],
  imports: [
    AuthenticationModule,
    PciChargerOptionModule,
    MongooseModule.forFeature([
      { name: Pci.name, schema: PciSchema }
    ])
  ],
  providers: [PciService]
})
export class PciModule { }
