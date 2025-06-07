// src/products/product.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number; // ID autoincrementable

  @Column()
  name: string; // Nombre del producto

  @Column("text")
  description: string; // Descripción del producto

  @Column("decimal", { precision: 10, scale: 2 })
  price: number; // Precio con 2 decimales

  @Column()
  stock: number; // Cantidad disponible en inventario

  // ... otras columnas ...

  @ManyToOne(() => User, (user) => user.products, { eager: false })
  createdBy: User;
}
