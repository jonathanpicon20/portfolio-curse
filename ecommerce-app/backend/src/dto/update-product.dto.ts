// src/products/dto/update-product.dto.ts
import { PartialType } from "@nestjs/mapped-types";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { CreateProductDto } from "./create-product.dto";

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    example: "Camiseta actualizada",
    description: "Nombre del producto (opcional)",
  })
  name?: string;

  @ApiPropertyOptional({
    example: "Nueva descripción",
    description: "Descripción del producto (opcional)",
  })
  description?: string;

  @ApiPropertyOptional({
    example: 15.99,
    description: "Precio del producto (opcional)",
  })
  price?: number;

  @ApiPropertyOptional({
    example: 30,
    description: "Stock disponible (opcional)",
  })
  stock?: number;

  constructor(partial: Partial<UpdateProductDto>) {
    super();
    Object.assign(this, partial);
  }
}
