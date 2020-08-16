import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

import { PciChargerOption } from "src/schema";


@Schema({
  versionKey: false,
  _id: false
})
export class PciCharger extends PciChargerOption {

  @Prop({
    required: true,
    min: 1
  })
  points: number

}

const PciChargerSchema = SchemaFactory.createForClass(PciCharger);
export { PciChargerSchema };