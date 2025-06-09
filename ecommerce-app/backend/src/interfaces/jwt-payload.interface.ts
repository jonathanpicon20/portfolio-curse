export interface JwtPayload {
  sub: string; // ID del usuario
  email: string;
  role?: string; // Agrega `role` si lo usas
  iat?: number; // Fecha de emisión (opcional)
  exp?: number; // Fecha de expiración (opcional)
}
