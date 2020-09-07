import { Controller, Get, Post, UseGuards, Req, Body, UsePipes, Query, Put, Param, Delete, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Types as mTypes } from 'mongoose';
import { Pci } from './pci.schema';
import { PciChargerOptionService, User } from 'src/schema';
import { PciService } from './pci.service';
import { ValidatePciChargersPipe } from './validate-pci-chargers.pipe';
import { TranformDeleteResponse } from './tranform-delete-response.interceptor';
import { BookingService } from 'src/booking/booking.service';

@Controller('pci')
@UseGuards(AuthGuard('jwt'))
export class PciController {

  constructor(
    private readonly _pciService: PciService,
    private readonly _pciChargerOption: PciChargerOptionService,
    private readonly _bookingService: BookingService
  ) { }

  @Get('charger-option')
  async chargerTypes() {
    return this._pciChargerOption.list();
  }

  @Get()
  async list(@Req() req: Request, @Query('user') userType: string) {
    if (userType === 'current') {
      return this._pciService.findByOwner((req.user as User)._id);
    }
    return this._pciService.all();
  }

  @Get(":id")
  async pciById(@Param("id") id: mTypes.ObjectId) {
    return this._pciService.findById(id);
  }

  @Get(":id/booking")
  async pciBooking(@Param("id") id: mTypes.ObjectId) {
    return this._bookingService.findByPciId(id);
  }

  @Post()
  @UsePipes(ValidatePciChargersPipe)
  async create(@Req() req: Request, @Body() pci: Pci) {
    pci.owner = (req.user as User)._id;
    return this._pciService.create(pci);
  }

  @Put()
  @UsePipes(ValidatePciChargersPipe)
  async update(@Req() req: Request, @Body() pci: Pci) {
    pci.owner = (req.user as User)._id;
    return this._pciService.update(pci);
  }

  @Delete(":id")
  @UseInterceptors(TranformDeleteResponse)
  async delete(@Req() req: Request, @Param("id") pciId: string) {
    return this._pciService.delete((req.user as User)._id, pciId);
  }

}
