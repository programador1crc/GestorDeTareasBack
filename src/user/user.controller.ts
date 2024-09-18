//import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
//import { UserService } from './user.service';
//import { CreateUserDto } from '../dto/create-user.dto';
//import { UpdateUserDto } from '../dto/update-user.dto';
//
//@Controller('user')
//export class UserController {
//  constructor(private readonly userService: UserService) {}
//
//  @Post()
//  create(@Body() createUserDto: CreateUserDto) {
//    return this.userService.create(createUserDto);
//  }
//
//  @Get()
//  findAll() {
//    return this.userService.findAll();
//  }
//
//  @Get(':id')
//  findOne(@Param('id') id: string) {
//    return this.userService.findOne(+id);
//  }
//
//  @Patch(':id')
//  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
//    return this.userService.update(+id, updateUserDto);
//  }
//
//  @Delete(':id')
//  remove(@Param('id') id: string) {
//    return this.userService.remove(+id);
//  }
//}
import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() userData: any) {
    return this.userService.create(userData);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: any) {
    return this.userService.update(id, updateData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
