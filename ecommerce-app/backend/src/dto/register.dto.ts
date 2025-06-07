// src/auth/dto/register.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty({
    example: "usuario@correo.com",
    description: "Correo electrónico del usuario",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "123456",
    description: "Contraseña del usuario (mínimo 6 caracteres)",
  })
  @IsString()
  @MinLength(6)
  password: string;
}
