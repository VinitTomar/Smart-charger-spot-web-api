import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document, Types as mTypes } from "mongoose";

import mongooseUniqueValidator = require("mongoose-unique-validator");

import { GpsCoordinate, GpsCoordinateSchema } from './gps-coordinate.schema';
import { Address, AddressSchema } from "./address.schema";
import { PciCharger, PciChargerSchema } from "./pci-charger.schema";


@Schema({
  versionKey: false
})
export class Pci extends Document {

  @Prop({
    required: true
  })
  owner: mTypes.ObjectId;

  @Prop({
    required: true,
    maxlength: 150,
    unique: true
  })
  name: string;

  @Prop({
    maxlength: 250
  })
  highWay: string;

  @Prop({
    type: GpsCoordinateSchema
  })
  gpsCoord: GpsCoordinate;

  @Prop({
    required: true,
    type: AddressSchema
  })
  address: Address;

  @Prop({
    type: [PciChargerSchema],
    required: true,
    default: undefined
  })
  chargers: PciCharger[];

}


const PciSchema = SchemaFactory.createForClass(Pci);
PciSchema.plugin(mongooseUniqueValidator, { type: 'unique' });
export { PciSchema };