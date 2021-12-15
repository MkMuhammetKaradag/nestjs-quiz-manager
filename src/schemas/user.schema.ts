import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop(String)
  name: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop(String)
  password: string;

  @Prop(Date)
  createdAt: Date;

  @Prop(Date)
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
