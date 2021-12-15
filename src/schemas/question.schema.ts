import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Quiz } from './quiz.schema';
export type QuestionDocument = Question & Document;

@Schema()
export class Question {
  @Prop()
  question: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' })
  quizId: mongoose.Types.ObjectId; //Quiz;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }] })
  optionsId: mongoose.Types.ObjectId[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
