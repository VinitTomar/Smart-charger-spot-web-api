import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({
  versionKey: false,
  _id: false
})
export class GpsCoordinate extends Document {

  @Prop({
    required: true,
    min: -90,
    max: 90
  })
  latitude: number;

  @Prop({
    required: true,
    min: -180,
    max: 180
  })
  longitue: number;
}

const GpsCoordinateSchema = SchemaFactory.createForClass(GpsCoordinate);
export { GpsCoordinateSchema };