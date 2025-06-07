import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  // Este guardia utiliza la estrategia JWT definida en jwt.strategy.ts
  // No es necesario agregar lógica adicional aquí, ya que AuthGuard maneja la validación del token
  // y la inyección del usuario en el request.
}
