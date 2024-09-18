import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),UserModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
