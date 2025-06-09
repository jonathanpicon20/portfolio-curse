import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Verificamos que la variable de entorno JWT_SECRET exista
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido en el archivo .env");
    }

    super({
      // Extraemos el JWT desde el header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // Recomendado: validar la expiración del token
      ignoreExpiration: false,

      // Clave secreta para verificar la firma del token
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * Este método se llama automáticamente si el token es válido.
   * Aquí puedes validar el contenido del payload y devolver
   * los datos que estarán disponibles en `req.user`.
   */
  validate(payload: JwtPayload) {
    // Validamos que tenga los campos obligatorios
    if (!payload?.sub || !payload?.email) {
      throw new UnauthorizedException("Token inválido o incompleto");
    }

    // Retornamos la información que estará disponible como req.user
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role, // Opcional si estás usando roles
    };
  }
}
