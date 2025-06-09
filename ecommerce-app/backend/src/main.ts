import "reflect-metadata";
// main.ts
import { ValidationPipe } from "@nestjs/common/pipes/validation.pipe";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { AppModule } from "./app.module";
import { ResponseInterceptor } from "./common/interceptors/response.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("API de Productos")
    .setDescription("Documentación de la API con Scalar")
    .setVersion("1.0")
    .addBearerAuth() // Para permitir autenticación JWT
    .build();
  app.useGlobalPipes(new ValidationPipe());

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, documentFactory); // URL: http://localhost:3000/api
  app.use(
    "/docs",
    apiReference({
      theme: "purple",
      content: documentFactory,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  await app.listen(3000);
}
bootstrap();
