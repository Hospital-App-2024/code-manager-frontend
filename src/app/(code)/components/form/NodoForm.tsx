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
import { NodoSchema, NodoValues } from "@/schema/CodeShema";
import { createNodo } from "@/actions/fireAlarm/createNodo";

export const NodoForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<NodoValues>({
    resolver: zodResolver(NodoSchema),
    defaultValues: {
      building: "",
      nodo: 0,
    },
  });

  const onSubmit = async (data: NodoValues) => {
    startTransition(async () => {
      try {
        await createNodo(data);
        toast.success("Nodo creado correctamente");
        form.reset();
      } catch (error) {
        toast.error("Error al crear el Nodo");
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Type */}
        <FormField
          control={form.control}
          name="building"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edificio</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Edificio" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nodo */}
        <FormField
          control={form.control}
          name="nodo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nodo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Nodo" type="number" />
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
