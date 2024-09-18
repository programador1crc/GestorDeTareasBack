//import { Injectable } from '@nestjs/common';
//import { CreateUserDto } from '../dto/create-user.dto';
//import { UpdateUserDto } from '../dto/update-user.dto';
//
//@Injectable()
//export class UserService {
//  create(createUserDto: CreateUserDto) {
//    return 'This action adds a new user';
//  }
//
//  findAll() {
//    return `This action returns all user`;
//  }
//
//  findOne(id: number) {
//    return `This action returns a #${id} user`;
//  }
//
//  update(id: number, updateUserDto: UpdateUserDto) {
//    return `This action updates a #${id} user`;
//  }
//
//  remove(id: number) {
//    return `This action removes a #${id} user`;
//  }
//}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: any): Promise<User> {
    const newUser = new this.userModel(userData);

    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, updateData: any): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updatedUser) throw new NotFoundException('User not found');

    return updatedUser;
  }

  async delete(id: string): Promise<any> {
    const result = await this.userModel.findByIdAndDelete(id).exec();

    if (!result) throw new NotFoundException('User not found');

    return result;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
