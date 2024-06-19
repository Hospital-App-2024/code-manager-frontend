import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Ingresa un correo electrónico válido",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export interface LoginValues extends z.infer<typeof LoginSchema> {}