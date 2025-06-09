import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateProductDto } from "../dto/create-product.dto";
import { UpdateProductDto } from "../dto/update-product.dto";
import { RequestWithUser } from "../interfaces/request-with-user.interface";
import { ProductsService } from "./products.service";
@UseGuards(JwtAuthGuard) // 👈 Asegura que el token se exige
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createDto: CreateProductDto, @Req() req: RequestWithUser) {
    return this.productsService.create(createDto, req.user);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateDto: UpdateProductDto) {
    return this.productsService.update(+id, updateDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }

  @Get("profile")
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }
}
