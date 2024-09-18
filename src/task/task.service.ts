import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>,private userService: UserService) {}

  async create(taskData: any): Promise<Task> {
    const newTask = new this.taskModel(taskData);
    return newTask.save();
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findById(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async update(id: string, updateData: any): Promise<Task> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updatedTask) throw new NotFoundException('Task not found');
    return updatedTask;
  }

  async delete(id: string): Promise<any> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Task not found');
    return result;
  }

  async findByUserId(userId: string): Promise<Task[]>{
    const user = await this.userService.findById(userId);
    if(user.rol == 'admin'){  
      console.log(user.rol);
      const task = await this.findAll();
      if(!task) throw new NotFoundException('No tasks created');
      return task;
    }else{  
      const task = await this.taskModel.find({userId}).exec();
      if(!task) throw new NotFoundException('No tasks created');
      return task;
    }
  }
}