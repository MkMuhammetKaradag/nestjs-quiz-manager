import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
export type OptionDocument = Option & Document;

@Schema()
export class Option {
  @Prop()
  text: string;

  @Prop()
  isCorrent: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
  questionId: mongoose.Types.ObjectId;
}

export const OptionSchema = SchemaFactory.createForClass(Option);
