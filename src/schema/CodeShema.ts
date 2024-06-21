import { z } from "zod";
import { format } from "@formkit/tempo";

export const CodeGreenSchema = z.object({
  activeBy: z.string().min(3, {
    message: "Mínimo 3 caracteres",
  }),
  createdAt: z.date({
    required_error: "Seleccione una fecha y hora",
  }),
  location: z.string().min(3, {
    message: "Mínimo 3 caracteres",
  }),
  event: z
    .string({
      required_error: "Ingrese el evento",
    })
    .min(4, {
      message: "Mínimo 4 caracteres",
    }),
  operatorId: z.string().min(4, {
    message: "Seleccione un operador",
  }),
  police: z.coerce.boolean({
    required_error: "Seleccione si fue carabineros",
  }),
});

export interface CodeGreenValues extends z.infer<typeof CodeGreenSchema> {}

export enum Team {
  "UCI" = "UCI",
  "URGENCIA" = "URGENCIA",
  "UCIPEDIATRICA" = "UCI PEDIÁTRICA",
}

export const CodeBlueSchema = z.object({
  createdAt: z.date({
    required_error: "Seleccione una fecha y hora",
  }),
  team: z.enum(["UCI", "URGENCIA", "UCI PEDIÁTRICA"], {
    message: "Seleccione un equipo",
  }),
  activeBy: z.string().min(3, {
    message: "Mínimo 3 caracteres",
  }),
  operatorId: z.string().min(4, {
    message: "Seleccione un operador",
  }),
  location: z.string().min(3, {
    message: "Mínimo 3 caracteres",
  }),
});

export interface CodeBlueValues extends z.infer<typeof CodeBlueSchema> {}
