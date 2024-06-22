"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/form/DatePicker";
import { SelectOperator } from "@/components/form/SelectOperator";
import { useTransition } from "react";
import { ButtonForm } from "@/components/form/ButtonForm";
import { CodeAirSchema, CodeAirValues } from "@/schema/CodeShema";
import { createCodeAir } from "@/actions/codeAir/createCodeAir";

export const CodeAirForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<CodeAirValues>({
    resolver: zodResolver(CodeAirSchema),
    defaultValues: {
      createdAt: new Date(),
      activeBy: "",
      operatorId: "",
      location: "",
    },
  });

  const onSubmit = async (data: CodeAirValues) => {
    startTransition(async () => {
      try {
        await createCodeAir(data);
        toast.success("Código azul creado correctamente");
        form.reset();
      } catch (error) {
        toast.error("Error al crear código azul");
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          {/* Fecha y hora */}
          <FormField
            control={form.control}
            name="createdAt"
            render={({ field }) => (
              <DatePicker
                name={field.name}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {/* Funcionario/a */}
          <FormField
            control={form.control}
            name="activeBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activo por</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Operador */}
          <FormField
            control={form.control}
            name="operatorId"
            render={({ field }) => (
              <SelectOperator
                name={field.name}
                value={field.value}
                onValueChange={field.onChange}
              />
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

        {/* EmergencyDetail */}
        <FormField
          control={form.control}
          name="emergencyDetail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detalle de la emergencia</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Ingrese el detalle de la emergencia
              </FormDescription>
            </FormItem>
          )}
        />

        <ButtonForm isDisabled={isPending} title="Crear" type="submit" />
      </form>
    </Form>
  );
};
