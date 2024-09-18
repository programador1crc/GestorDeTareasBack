import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Validar usuario por email y password
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password, ...result } = user; // Evitar retornar el password
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  // Generar el JWT
  async login(user: any) {
    const payload = {
      email: user._doc.email,
      sub: user._doc._id,
      nombre: user._doc.name,
      rol: user._doc.rol,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  
}
