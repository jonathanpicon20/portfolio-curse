// src/app.module.ts
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import "reflect-metadata";
import { AuthModule } from "./auth/auth.module";
import { Product } from "./products/product.entity";
import { ProductsModule } from "./products/products.module";
import { User } from "./users/user.entity";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ⚙️ Habilitamos acceso a .env en todo el proyecto
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? "3306"), // el + convierte a número
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Product],
      autoLoadEntities: true,
      synchronize: true, // ❗Solo en desarrollo
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}
