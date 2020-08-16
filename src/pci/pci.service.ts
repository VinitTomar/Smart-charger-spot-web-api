import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pci } from './pci.schema';
import { Model } from 'mongoose';

@Injectable()
export class PciService {

  constructor(
    @InjectModel(Pci.name) private readonly _pciModel: Model<Pci>
  ) { }


  async all() {
    return this._pciModel.find();
  }

  async findByOwner() {
    return this._pciModel.find({});
  }

  async create(pci: Pci) {
    return this._pciModel.create(pci);
  }

}
