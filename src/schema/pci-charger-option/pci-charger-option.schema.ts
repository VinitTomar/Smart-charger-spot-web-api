import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({
  versionKey: false
})
export class PciChargerOption extends Document {

  @Prop({
    required: true,
    enum: ["Fast", "Moderate"]
  })
  type: string;

  @Prop({
    required: true,
    enum: [
      "CCS (min 50 kW)",
      "CHAdeMO (min 50 kW)",
      "Type-2 AC (min 22 kW)",
      "Bharat DC-001 (15 kW)",
      "Bharat AC-001 (10 kW)"
    ]
  })
  connector: string;

  @Prop({
    required: true,
    enum: [
      "200 - 1000",
      "380 - 480",
      "72 - 200",
      "230"
    ]
  })
  voltageRange: string;

}


const PciChargerOptionSchema = SchemaFactory.createForClass(PciChargerOption);
export { PciChargerOptionSchema };