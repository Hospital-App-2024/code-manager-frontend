"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { ButtonForm } from "@/components/form/ButtonForm";
import { DeviceSchema, DeviceValues } from "@/schema/CodeShema";
import { createDevice } from "@/actions/fireAlarm/createDevice";
import { SelectNodo } from "@/components/form/SelectLazo";
import { SelectTypeDevice } from "@/components/form/SelectTypeDevice";
import { Textarea } from "@/components/ui/textarea";

export const DeviceForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<DeviceValues>({
    resolver: zodResolver(DeviceSchema),
    defaultValues: {
      lazo: "",
      location: "",
      nodoId: "",
      typeDeviceId: "",
      device: "",
    },
  });

  const onSubmit = async (data: DeviceValues) => {
    startTransition(async () => {
      try {
        await createDevice(data);
        toast.success("Dispositivo creado correctamente");
        form.reset();
      } catch (error) {
        toast.error("Error al crear el dispositivo");
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="nodoId"
            render={({ field }) => (
              <SelectNodo
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />

          {/* Lazo */}
          <FormField
            control={form.control}
            name="lazo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lazo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ej: L1" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeDeviceId"
            render={({ field }) => (
              <SelectTypeDevice
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />

          <FormField
            control={form.control}
            name="device"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numero de dispositivo</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ej: N004" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Ubicación */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonForm isDisabled={isPending} title="Crear" type="submit" />
      </form>
    </Form>
  );
};
