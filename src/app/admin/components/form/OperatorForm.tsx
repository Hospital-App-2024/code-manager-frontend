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
import { OperatorSchema, OperatorValues } from "@/schema/adminSchema";
import { createOperator } from "@/actions/operator/createOperator";

export const OperatorForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<OperatorValues>({
    resolver: zodResolver(OperatorSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: OperatorValues) => {
    startTransition(async () => {
      try {
        await createOperator(data);
        toast.success("Operador creado correctamente");
        form.reset();
      } catch (error) {
        toast.error("Error al crear el operador");
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input {...field} />
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
