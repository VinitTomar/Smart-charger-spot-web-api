import { Controller, UseGuards, Get, Post, Req, Body, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookingService } from './booking.service';
import { Request } from 'express';
import { Booking } from './booking.schema';
import { User } from 'src/schema';
import { Types as mTypes } from 'mongoose';

@Controller('booking')
@UseGuards(AuthGuard('jwt'))
export class BookingController {

  constructor(
    private _bookingService: BookingService
  ) { }

  @Get()
  async userBookingList(@Req() req: Request) {
    return await this._bookingService.findByBookerId((req.user as User)._id);
  }

  @Get(":id")
  async findById(@Param("id") id: mTypes.ObjectId) {
    return await this._bookingService.findById(id);
  }

  @Post()
  async createBooking(@Req() req: Request, @Body() booking: Booking) {
    booking.bookerId = (req.user as User)._id;
    return await this._bookingService.create(booking);
  }

  @Post(":id/cancel")
  async cancelBooking(@Req() req: Request, @Param("id") id: mTypes.ObjectId) {
    return await this._bookingService.cancelBooking(id, (req.user as User)._id);
  }

}
