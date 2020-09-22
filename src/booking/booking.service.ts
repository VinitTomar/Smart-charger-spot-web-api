import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from './booking.schema';
import { Model, Types as mTypes } from 'mongoose';

@Injectable()
export class BookingService {

  constructor(
    @InjectModel(Booking.name) private readonly _bookingModel: Model<Booking>
  ) { }

  async findById(_id: mTypes.ObjectId) {
    return await this._bookingModel.findOne({ _id });
  }

  async findByBookerId(bookerId: mTypes.ObjectId) {
    return await this._bookingModel.find({ bookerId });
  }

  async findByPciId(pciId: mTypes.ObjectId) {
    return await this._bookingModel.find({ pciId });
  }

  async create(booking: Booking) {
    booking.status = 'successful';
    return await this._bookingModel.create(booking);
  }

  async cancelBooking(_id: mTypes.ObjectId, bookerId: mTypes.ObjectId) {
    const booking = await this._bookingModel.findOne({ bookerId, _id });

    if (!booking) {
      throw new UnauthorizedException('You are not authorized to cancel this booking');
    }

    booking.status = 'cancel';
    return await booking.save();
  }

}
