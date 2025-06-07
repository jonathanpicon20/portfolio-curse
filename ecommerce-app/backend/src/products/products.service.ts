// src/products/products.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IsNull, Repository } from "typeorm";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { User } from "../users/user.entity";
import { Product } from "./product.entity";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  create(dto: CreateProductDto, user: User) {
    const product = this.productRepo.create({ ...dto, createdBy: user });
    return this.productRepo.save(product);
  }
  findAll() {
    return this.productRepo.find({
      where: { deletedAt: IsNull() }, // ⛔ Excluye productos eliminados
      relations: ["createdBy"],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.productRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productRepo.softRemove(product); // ✅ Esto marca el producto como eliminado
    return `Producto  ${product.name} ha sido eliminado con éxito`;
  }
}
