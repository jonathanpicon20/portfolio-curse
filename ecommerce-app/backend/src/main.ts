// main.ts
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("API de Productos")
    .setDescription("Documentación de la API con Scalar")
    .setVersion("1.0")
    .addBearerAuth() // Para permitir autenticación JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document); // URL: http://localhost:3000/docs

  await app.listen(3000);
}
bootstrap();
