import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Req() req: Request & { user: JwtPayload }) {
    return req.user;
  }

  constructor(private authService: AuthService) {}

  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.validate(dto.email, dto.password);
  }
}
