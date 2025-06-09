import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "../users/user.entity"; // Adjust the import path as necessary
import { UsersService } from "../users/users.service";
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // Registro
  async register(email: string, password: string) {
    try {
      const hashed = await bcrypt.hash(password, 10);
      const user = await this.usersService.create({ email, password: hashed });
      return this.login(user);
    } catch (error) {
      throw new InternalServerErrorException(
        "Error al registrar usuario: " + error.message,
      );
    }
  }

  // Login
  async validate(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException("Credenciales inválidas");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException("Credenciales inválidas");
      }

      return this.login(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException(
        "Error durante la validación: " + error.message,
      );
    }
  }

  // Generar token
  login(user: User) {
    try {
      const payload = { sub: user.id, email: user.email, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new InternalServerErrorException(
        "Error al generar el token: " + error.message,
      );
    }
  }
}
