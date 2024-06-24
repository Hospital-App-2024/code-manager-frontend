import { z } from "zod";

export enum Role {
  Admin = "Admin",
  User = "User",
  Operator = "Operator",
}

export const UserSchema = z.object({
  name: z.string().min(3, {
    message: "Mínimo 3 caracteres",
  }),
  email: z.string().email({
    message: "Ingresa un correo electrónico válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
  role: z.nativeEnum(Role),
});

export interface UserValues extends z.infer<typeof UserSchema> {}

export const OperatorSchema = z.object({
  name: z.string().min(3, {
    message: "Mínimo 3 caracteres",
  }),
});

export interface OperatorValues extends z.infer<typeof OperatorSchema> {}
