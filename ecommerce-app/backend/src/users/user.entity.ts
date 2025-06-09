import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "../products/product.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: "admin" }) // Por ahora solo 'admin'
  role: string;

  @OneToMany(() => Product, (product) => product.createdBy)
  products: Product[];
}
