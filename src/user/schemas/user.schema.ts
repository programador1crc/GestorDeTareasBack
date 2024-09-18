import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: true, default: 'user' })
  rol: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
