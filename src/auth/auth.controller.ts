import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  // Registro de usuario
  @Post('register')
  async register(@Body() body: any) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    body.password = hashedPassword;
    return this.userService.create(body);
  }

  // Inicio de sesión (Login)
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    console.log("usuario que recibe el post luiego de autenticar", user);
    return this.authService.login(user);
  }

  // Creacion de tareas
  //@Post('taskCreate')

}
