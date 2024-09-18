import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() taskData: any) {
    return this.taskService.create(taskData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.taskService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('myTasks/:id')
  findMyTasks(@Param('id') id: string){
    return this.taskService.findByUserId(id);
  }
}
