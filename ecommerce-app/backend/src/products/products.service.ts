// src/products/products.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
    return this.productRepo.find({ relations: ["createdBy"] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ["createdBy"],
    });
    if (!product) throw new NotFoundException("Producto no encontrado");
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.productRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }
}
