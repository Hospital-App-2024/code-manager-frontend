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
import { TypeDeviceSchema, TypeDeviceValues } from "@/schema/CodeShema";
import { createTypeDevice } from "@/actions/fireAlarm/createTypeDevice";

export const TypeDeviceForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<TypeDeviceValues>({
    resolver: zodResolver(TypeDeviceSchema),
    defaultValues: {
      type: "",
    },
  });

  const onSubmit = async (data: TypeDeviceValues) => {
    startTransition(async () => {
      try {
        await createTypeDevice(data);
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
        {/* Type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de dispositivo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Tipo de dispositivo" />
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
