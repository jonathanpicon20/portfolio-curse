// src/products/dto/create-product.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ example: "Camiseta", description: "Nombre del producto" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Camiseta 100% algodón",
    description: "Descripción del producto",
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 19.99, description: "Precio del producto" })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 50, description: "Stock disponible" })
  @IsNumber()
  @Min(0)
  stock: number;
}
