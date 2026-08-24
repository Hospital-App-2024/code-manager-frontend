"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  CalendarClock, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  ShieldAlert, 
  UserCheck, 
  Users 
} from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { useOperator } from "@/hooks/use-operator";
import { emergency_codes } from "@/requests";

import { CodeType, EmergencyCode } from "@/interfaces/emergencyCode.interface";
import { QueryKeys } from "@/interfaces";

// Helper for local datetime-local formatting (YYYY-MM-DDTHH:mm)
const getLocalDateTimeString = (isoString?: string) => {
  const date = isoString ? new Date(isoString) : new Date();
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
};

// Validation schema
const schema = z
  .object({
    type: z.string().min(1, "El tipo de código es requerido"),
    operatorId: z.string().min(1, "Debe seleccionar un operador"),
    activeBy: z.string().min(1, "El nombre de quien activa es requerido"),
    location: z.string().min(1, "La ubicación es requerida"),
    activationTime: z.string().min(1, "La fecha y hora de activación es requerida"),
    observations: z.string().optional(),

    // GREEN
    event: z.string().optional(),
    police: z.boolean().optional(),
    isClosed: z.boolean().optional(),
    closedBy: z.string().optional(),
    closedAt: z.string().optional(),

    // BLUE
    team: z.string().optional(),

    // AIR
    emergencyDetail: z.string().optional(),

    // RED
    COGRID: z.boolean().optional(),
    firefighterCalledTime: z.string().optional(),

    // LEAK
    patientName: z.string().optional(),
    patientDescription: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isClosed && !data.closedBy?.trim()) {
        return false;
      }
      return true;
    },
    {
      message: "Debe indicar quién finaliza el código",
      path: ["closedBy"],
    }
  );

type FormValues = z.infer<typeof schema>;

interface Props {
  type: CodeType;
  initialData?: EmergencyCode;
  onSuccess?: () => void;
}

const getCodeTypeName = (type: CodeType) => {
  switch (type) {
    case "GREEN":
      return "Verde";
    case "BLUE":
      return "Azul";
    case "AIR":
      return "Aéreo";
    case "RED":
      return "Rojo";
    case "LEAK":
      return "de Fuga";
    default:
      return type;
  }
};

export function EmergencyCodeForm({ type, initialData, onSuccess }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { data: operators, isLoading: isLoadingOperators } = useOperator();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: type,
      operatorId: initialData?.operatorId || "",
      activeBy: initialData?.activeBy || "",
      location: initialData?.location || "",
      activationTime: getLocalDateTimeString(initialData?.activationTime),
      observations: initialData?.observations || "",

      event: initialData?.event || "",
      police: initialData?.police ?? false,
      isClosed: initialData?.isClosed ?? false,
      closedBy: initialData?.closedBy || "",
      closedAt: initialData?.closedAt
        ? getLocalDateTimeString(initialData.closedAt)
        : "",
      team: initialData?.team || "",
      emergencyDetail: initialData?.emergencyDetail || "",
      COGRID: initialData?.COGRID ?? false,
      firefighterCalledTime: initialData?.firefighterCalledTime
        ? getLocalDateTimeString(initialData.firefighterCalledTime)
        : "",
      patientName: initialData?.patientName || "",
      patientDescription: initialData?.patientDescription || "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);

      const payload: Record<string, any> = {
        type: values.type,
        operatorId: values.operatorId,
        activeBy: values.activeBy,
        location: values.location,
        activationTime: new Date(values.activationTime).toISOString(),
        observations: values.observations || null,
      };

      // Inyectar campos específicos según el tipo
      if (type === "GREEN") {
        payload.event = values.event || null;
        payload.police = Boolean(values.police);
        payload.isClosed = Boolean(values.isClosed);
        if (values.isClosed) {
          payload.closedBy = values.closedBy?.trim() || null;
          payload.closedAt = values.closedAt
            ? new Date(values.closedAt).toISOString()
            : new Date().toISOString();
        }
      } else if (type === "BLUE") {
        payload.team = values.team || null;
      } else if (type === "AIR") {
        payload.emergencyDetail = values.emergencyDetail || null;
      } else if (type === "RED") {
        payload.COGRID = Boolean(values.COGRID);
        payload.firefighterCalledTime = values.firefighterCalledTime
          ? new Date(values.firefighterCalledTime).toISOString()
          : null;
      } else if (type === "LEAK") {
        payload.patientName = values.patientName || null;
        payload.patientDescription = values.patientDescription || null;
      }

      if (initialData?.id) {
        await emergency_codes.patch(initialData.id, payload);
        toast.success("Código de emergencia actualizado correctamente");
      } else {
        await emergency_codes.post(payload);
        toast.success(`Código ${getCodeTypeName(type)} creado exitosamente`);
      }

      // Invalidar la caché de React Query para refrescar la tabla al instante
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EmergencyCodes] });

      router.refresh();
      if (onSuccess) {
        onSuccess();
      } else if (!initialData?.id) {
        router.push(`/code-${type.toLowerCase()}`);
      }
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      toast.error("Ocurrió un error al guardar la emergencia");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* SECCIÓN 1: DATOS GENERALES */}
        <Card className="shadow-xs border-border/80">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Información General de la Emergencia
            </CardTitle>
            <CardDescription>
              Complete los datos del reporte inicial y la ubicación del evento.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* FECHA Y HORA MANUAL */}
            <FormField
              control={form.control}
              name="activationTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 font-medium">
                    <CalendarClock className="w-3.5 h-3.5 text-muted-foreground" />
                    Fecha y Hora de Activación (Manual)
                  </FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Hora precisa en que se reportó la alerta.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* OPERADOR */}
            <FormField
              control={form.control}
              name="operatorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-muted-foreground" />
                    Operador en Turno
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un operador..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {!isLoadingOperators &&
                        operators?.map((op) => (
                          <SelectItem key={op.id} value={op.id}>
                            {op.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ACTIVADO POR */}
            <FormField
              control={form.control}
              name="activeBy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 font-medium">
                    <Users className="w-3.5 h-3.5 text-muted-foreground" />
                    Activado por
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre o cargo de quien solicita la activación"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* UBICACIÓN */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    Ubicación del Suceso
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. Torre A, Piso 3, Sala de Procedimientos"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* SECCIÓN 2: CAMPOS ESPECÍFICOS SEGÚN EL TIPO DE CÓDIGO */}
        <Card className="shadow-xs border-border/80">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              Detalles Específicos del Código {getCodeTypeName(type)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* CÓDIGO VERDE */}
            {type === "GREEN" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="event"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detalle del Evento</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ej. Agresión verbal, hurto, riña..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="police"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3.5 shadow-2xs">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-medium">
                          Presencia de Carabineros
                        </FormLabel>
                        <FormDescription className="text-xs">
                          ¿Se requirió presencia o llamada policial?
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* CÓDIGO AZUL */}
            {type === "BLUE" && (
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipo de Reanimación Asignado</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el equipo médico" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Equipo urgencia">
                          Equipo Urgencia
                        </SelectItem>
                        <SelectItem value="Equipo UCI">Equipo UCI</SelectItem>
                        <SelectItem value="Equipo UCI pediatrica">
                          Equipo UCI Pediátrica
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* CÓDIGO AÉREO */}
            {type === "AIR" && (
              <FormField
                control={form.control}
                name="emergencyDetail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detalle de la Emergencia Aérea</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Describa el aterrizaje/despegue, condición de helipuerto, tipo de aeronave o paciente en traslado..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* CÓDIGO ROJO */}
            {type === "RED" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="firefighterCalledTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-1.5 font-medium">
                        <CalendarClock className="w-3.5 h-3.5 text-destructive" />
                        Llamado a Bomberos (Hora Manual)
                      </FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Hora exacta del contacto con la central de bomberos.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="COGRID"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3.5 shadow-2xs">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-medium">
                          Activación COGRID
                        </FormLabel>
                        <FormDescription className="text-xs">
                          Comité para la Gestión del Riesgo y Desastres.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* CÓDIGO FUGA */}
            {type === "LEAK" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre del Paciente (Opcional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nombre y apellidos si se conocen"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="patientDescription"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Descripción del Paciente y Vestimenta</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={3}
                          placeholder="Características físicas, ropa que vestía, última dirección vista..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* El cierre es una regla exclusiva del Código Verde. */}
            {initialData?.id && type === "GREEN" && (
              <div className="mt-4 pt-4 border-t space-y-4 bg-muted/20 p-4 rounded-lg">
                <FormField
                  control={form.control}
                  name="isClosed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between">
                      <div className="space-y-0.5">
                        <FormLabel className="text-sm font-semibold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Finalizar / Dar por Concluida la Emergencia
                        </FormLabel>
                        <FormDescription className="text-xs">
                          Marque para cerrar el ciclo de este código.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (checked && !form.getValues("closedAt")) {
                              form.setValue(
                                "closedAt",
                                getLocalDateTimeString()
                              );
                            }
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("isClosed") && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <FormField
                      control={form.control}
                      name="closedBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Finalizado por{" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nombre de quien dio por finalizado"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="closedAt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Fecha y Hora de Cierre (Manual){" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* SECCIÓN 3: OBSERVACIONES */}
        <Card className="shadow-xs border-border/80">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">
              Observaciones Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="observations"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      rows={3}
                      placeholder="Escriba aquí cualquier antecedente clínico, derivación, coordinación externa o detalle relevante..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* BOTÓN DE SUBMIT */}
        <Button
          type="submit"
          className="w-full text-base py-5 font-semibold transition-all"
          disabled={isLoading}
        >
          {isLoading
            ? "Guardando..."
            : initialData
            ? "Actualizar código"
            : `Crear código ${getCodeTypeName(type).toLowerCase()}`}
        </Button>
      </form>
    </Form>
  );
}
