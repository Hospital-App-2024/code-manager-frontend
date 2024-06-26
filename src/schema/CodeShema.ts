import { z } from "zod";

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

export const CodeRedSchema = z.object({
  createdAt: z.date({
    required_error: "Seleccione una fecha y hora",
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
  COGRID: z.coerce.boolean({
    required_error: "Seleccione si hubo comunicación con COGRID",
    invalid_type_error: "Seleccione si hubo comunicación con COGRID",
  }),
  firefighterCalledTime: z
    .date({
      required_error: "Seleccione la hora en que se llamó al bombero",
    })
    .optional(),
});

export interface CodeRedValues extends z.infer<typeof CodeRedSchema> {}

export const CodeAirSchema = z.object({
  createdAt: z.date({
    required_error: "Seleccione una fecha y hora",
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
  emergencyDetail: z.string().min(3, {
    message: "Mínimo 3 caracteres",
  }),
});

export interface CodeAirValues extends z.infer<typeof CodeAirSchema> {}

export const codeLeakSchema = z.object({
  createdAt: z.date({
    required_error: "Seleccione una fecha y hora",
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
  patientDescription: z.string().min(3, {
    message: "Mínimo 3 caracteres",
  }),
});

export interface CodeLeakValues extends z.infer<typeof codeLeakSchema> {}

// Fire Alarm
export const TypeDeviceSchema = z.object({
  type: z.string().min(2, {
    message: "Mínimo 2 caracteres",
  }),
});

export interface TypeDeviceValues extends z.infer<typeof TypeDeviceSchema> {}

export const NodoSchema = z.object({
  nodo: z
    .string()
    .transform((v) => Number(v))
    .pipe(
      z
        .number({
          message: "Ingrese un número",
        })
        .positive({
          message: "Ingrese un número positivo",
        })
    ),
  building: z
    .string()
    .min(1, {
      message: "Mínimo 1 carácter",
    })
    .transform((v) => v.toUpperCase()),
});

export interface NodoValues extends z.infer<typeof NodoSchema> {}

export const DeviceSchema = z.object({
  lazo: z.string().min(1, {
    message: "Mínimo 1 caracteres",
  }),
  device: z
    .string()
    .min(2, {
      message: "Mínimo 2 caracteres",
    })
    .transform((v) => v.toUpperCase()),
  location: z.string().min(2, {
    message: "Mínimo 2 caracteres",
  }),
  nodoId: z.string().min(4, {
    message: "Seleccione un nodo",
  }),
  typeDeviceId: z.string().min(4, {
    message: "Seleccione un tipo de dispositivo",
  }),
});

export interface DeviceValues extends z.infer<typeof DeviceSchema> {}
