import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types as mTypes } from "mongoose";
import { PciCharger, PciChargerSchema } from "src/pci/pci-charger.schema";

@Schema({
  versionKey: false
})
export class Booking extends Document {

  @Prop({
    required: true
  })
  pciId: mTypes.ObjectId;

  @Prop({
    required: true
  })
  bookerId: mTypes.ObjectId;

  @Prop({
    required: true,
    type: PciChargerSchema
  })
  charger: PciCharger;

  @Prop({
    required: true,
    min: 1
  })
  pointerIndex: number;

  @Prop({
    required: true,
    enum: [
      'cancel',
      'successful'
    ]
  })
  status: 'cancel' | 'successful';

  @Prop({
    required: true,
  })
  start: Date;

  @Prop({
    required: true,
  })
  end: Date;

  @Prop({
    required: true,
    min: 15
  })
  duration: number;

}

const BookingSchema = SchemaFactory.createForClass(Booking);
export { BookingSchema };