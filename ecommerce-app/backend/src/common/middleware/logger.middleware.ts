// Importamos los tipos necesarios desde NestJS
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

// Usamos @Injectable para poder usar este middleware dentro del módulo
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // Implementamos la función "use" requerida por NestMiddleware
  use(req: Request, res: Response, next: NextFunction) {
    // Mostramos en consola el método HTTP y la ruta accedida
    console.log(`[${req.method}] ${req.originalUrl}`);

    // Llamamos a next() para que la petición siga su curso
    next();
  }
}
