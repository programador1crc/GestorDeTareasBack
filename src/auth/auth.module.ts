import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { UserModule } from '../user/user.module'; // Importar el módulo de usuario
import { JwtStrategy } from './jwt/jwt.strategy'; // Estrategia JWT que crearemos
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key', // Usa un secreto más fuerte para producción
      signOptions: { expiresIn: '1h' }, // El token expira en 1 hora
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
