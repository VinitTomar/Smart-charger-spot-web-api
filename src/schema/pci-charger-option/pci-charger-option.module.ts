import { Module } from '@nestjs/common';
import { PciChargerOptionService } from './pci-charger-option.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PciChargerOption, PciChargerOptionSchema } from './pci-charger-option.schema';

@Module({
  providers: [PciChargerOptionService],
  exports: [PciChargerOptionService],
  imports: [
    MongooseModule.forFeature([
      { name: PciChargerOption.name, schema: PciChargerOptionSchema }
    ])
  ]
})
export class PciChargerOptionModule { }
