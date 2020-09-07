import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pci } from './pci.schema';
import { Model, Types as mTypes } from 'mongoose';

@Injectable()
export class PciService {

  constructor(
    @InjectModel(Pci.name) private readonly _pciModel: Model<Pci>
  ) { }

  async all() {
    return this._pciModel.find();
  }

  async findById(id: mTypes.ObjectId) {
    return this._pciModel.findById(id);
  }

  async findByOwner(ownerId: mTypes.ObjectId) {
    return this._pciModel.find({ owner: ownerId });
  }

  async searchByKeyword(keyword: string) {
    const byName = await this._pciModel.find({ name: new RegExp(keyword) });
    const byHighWay = await this._pciModel.find({ highWay: new RegExp(keyword) });

    return [...byName, ...byHighWay];
  }

  async create(pci: Pci) {
    return await this._pciModel.create(pci);
  }

  async update(pciDetail: Pci) {
    const pci = await this.findById(pciDetail._id);
    pci.set('name', pciDetail.name);
    pci.set('highWay', pciDetail.highWay);
    pci.set('gpsCoord', pciDetail.gpsCoord);
    pci.set('address', pciDetail.address);
    pci.set('chargers', pciDetail.chargers);
    return pci.save();
  }

  async delete(ownerId: string, pciId: string) {
    return this._pciModel.deleteOne({
      owner: mTypes.ObjectId(ownerId),
      _id: mTypes.ObjectId(pciId)
    });
  }

}
