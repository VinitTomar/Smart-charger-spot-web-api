import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookingService } from './booking.service';

@Controller('booking')
@UseGuards(AuthGuard('jwt'))
export class BookingController {

  constructor(
    private _bookingService: BookingService
  ) { }

  @Get()
  async userBookingList() {
    return await this._bookingService.findByUserId();
  }

}
