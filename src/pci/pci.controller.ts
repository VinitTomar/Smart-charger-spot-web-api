import { Controller, Get, Post, UseGuards, Req, Body, UsePipes } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { PciChargerOptionService, User } from 'src/schema';
import { PciService } from './pci.service';
import { Request } from 'express';
import { Pci } from './pci.schema';
import { ValidatePciChargersPipe } from './validate-pci-chargers.pipe';

@Controller('pci')
@UseGuards(AuthGuard('jwt'))
export class PciController {

  constructor(
    private readonly _pciService: PciService,
    private readonly _pciChargerOption: PciChargerOptionService
  ) { }

  @Get('charger-option')
  async chargerTypes() {
    return this._pciChargerOption.list();
  }

  @Get()
  async list() {
    return this._pciService.all();
  }

  @Post()
  @UsePipes(ValidatePciChargersPipe)
  async create(@Req() req: Request, @Body() pci: Pci) {
    pci.owner = (req.user as User)._id;
    return this._pciService.create(pci);
  }

}
