import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>
@Schema()
export class Task {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  userName: string;

  @Prop({ required: true, default: 'Abierta' })
  state: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);