import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PciChargerOption } from './pci-charger-option.schema';
import { Model } from 'mongoose';

@Injectable()
export class PciChargerOptionService {
  constructor(
    @InjectModel(PciChargerOption.name) private readonly _pciChrgOptModel: Model<PciChargerOption>
  ) { }

  async list() {
    return this._pciChrgOptModel.find();
  }
}
