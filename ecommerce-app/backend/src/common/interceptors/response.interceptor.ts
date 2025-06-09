import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Response } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  // El método intercept intercepta la respuesta saliente
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // Envolvemos la data en un formato uniforme
        return {
          success: true,
          data: (data as T) || null,
          timestamp: new Date().toISOString(),
          statusCode:
            context.switchToHttp().getResponse<Response>().statusCode || 200,
          message: "success",
        };
      }),
    );
  }
}
