"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOperator } from "@/hooks/use-operator";
import { emergency_codes } from "@/requests";
import { useQueryClient } from "@tanstack/react-query";
import { QueryKeys } from "@/interfaces";
import { toast } from "sonner";
import { EmergencyCode, CodeType } from "@/interfaces/emergencyCode.interface";

// Validation schema
const schema = z.object({
  type: z.string().min(1, "Tipo de código es requerido"),
  operatorId: z.string().min(1, "El operador es requerido"),
  activeBy: z.string().min(1, "El activador es requerido"),
  location: z.string().min(1, "La ubicación es requerida"),
  activationTime: z.string().min(1, "La fecha de activación es requerida"),
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
});

type FormValues = z.infer<typeof schema>;

interface Props {
  type: CodeType;
  initialData?: EmergencyCode;
  onSuccess?: () => void;
}

export function EmergencyCodeForm({ type, initialData, onSuccess }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const { data: operators, isLoading: isLoadingOperators } = useOperator();

  const getLocalDate = (isoString?: string) => {
    if (!isoString) return new Date().toISOString().slice(0, 16);
    return new Date(isoString).toISOString().slice(0, 16);
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: type,
      operatorId: initialData?.operatorId || "",
      activeBy: initialData?.activeBy || "",
      location: initialData?.location || "",
      activationTime: getLocalDate(initialData?.activationTime),
      observations: initialData?.observations || "",
      
      event: initialData?.event || "",
      police: initialData?.police || false,
      isClosed: initialData?.isClosed || false,
      closedBy: initialData?.closedBy || "",
      closedAt: initialData?.closedAt ? getLocalDate(initialData.closedAt) : "",
      team: initialData?.team || "",
      emergencyDetail: initialData?.emergencyDetail || "",
      COGRID: initialData?.COGRID || false,
      firefighterCalledTime: initialData?.firefighterCalledTime ? getLocalDate(initialData.firefighterCalledTime) : "",
      patientName: initialData?.patientName || "",
      patientDescription: initialData?.patientDescription || "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      
      const payload: any = {
        type: values.type,
        operatorId: values.operatorId,
        activeBy: values.activeBy,
        location: values.location,
        activationTime: new Date(values.activationTime).toISOString(),
        observations: values.observations,
      };

      // Inyectar campos específicos
      if (type === "GREEN") {
        payload.event = values.event;
        payload.police = values.police;
        payload.isClosed = values.isClosed;
        if (values.isClosed) {
          payload.closedBy = values.closedBy;
          if (values.closedAt) {
            payload.closedAt = new Date(values.closedAt).toISOString();
          }
        }
      } else if (type === "BLUE") {
        payload.team = values.team;
      } else if (type === "AIR") {
        payload.emergencyDetail = values.emergencyDetail;
      } else if (type === "RED") {
        payload.COGRID = values.COGRID;
        if (values.firefighterCalledTime) {
          payload.firefighterCalledTime = new Date(values.firefighterCalledTime).toISOString();
        }
      } else if (type === "LEAK") {
        payload.patientName = values.patientName;
        payload.patientDescription = values.patientDescription;
      }

      if (initialData?.id) {
        await emergency_codes.patch(initialData.id, payload);
        toast.success("Emergencia actualizada correctamente");
      } else {
        await emergency_codes.post(payload);
        toast.success("Emergencia registrada correctamente");
      }
      
      // Invalidar la caché para forzar la recarga de la tabla
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EmergencyCodes] });
      
      router.refresh();
      if (onSuccess) onSuccess();
      
      // Si es una creación nueva, redirigir a la lista
      if (!initialData?.id) {
        router.push(`/code-${type.toLowerCase()}`);
      }
    } catch (error) {
      toast.error("Ocurrió un error al procesar la solicitud");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          
          <FormField
            control={form.control}
            name="activationTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha y Hora</FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="operatorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operador</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un operador" />
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

          <FormField
            control={form.control}
            name="activeBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activado por</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de quien activa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ubicación</FormLabel>
                <FormControl>
                  <Input placeholder="Ej. Piso 3, Sala 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* CAMPOS CONDICIONALES POR TIPO */}
        {type === "GREEN" && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="event"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evento</FormLabel>
                  <FormControl>
                    <Input placeholder="Detalle del evento" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="police"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Presencia de Carabineros</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            {initialData?.id && (
              <div className="col-span-2 space-y-4 rounded-md border p-4 bg-muted/20">
                <FormField
                  control={form.control}
                  name="isClosed"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Finalizar Código Verde</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                {form.watch("isClosed") && (
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <FormField
                      control={form.control}
                      name="closedBy"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Finalizado por</FormLabel>
                          <FormControl>
                            <Input placeholder="Nombre de quien finaliza" {...field} />
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
                          <FormLabel>Fecha y Hora de Cierre</FormLabel>
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
          </div>
        )}

        {type === "BLUE" && (
          <FormField
            control={form.control}
            name="team"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Equipo de Reanimación</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el equipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Equipo urgencia">Equipo urgencia</SelectItem>
                    <SelectItem value="Equipo UCI">Equipo UCI</SelectItem>
                    <SelectItem value="Equipo UCI pediatrica">Equipo UCI pediátrica</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {type === "AIR" && (
          <FormField
            control={form.control}
            name="emergencyDetail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Detalle de la Emergencia</FormLabel>
                <FormControl>
                  <Input placeholder="Detalle" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {type === "RED" && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firefighterCalledTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Llamado a Bomberos (Hora)</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="COGRID"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>COGRID</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>
        )}

        {type === "LEAK" && (
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Paciente</FormLabel>
                  <FormControl>
                    <Input placeholder="Opcional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="patientDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Descripción física..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observaciones</FormLabel>
              <FormControl>
                <Textarea placeholder="Observaciones adicionales..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Guardando..." : initialData ? "Actualizar Registro" : "Registrar Código"}
        </Button>
      </form>
    </Form>
  );
}
