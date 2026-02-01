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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { code_air } from "@/requests";
import { QueryKeys } from "@/interfaces";
import { CodeAirSchema, CodeAirValues } from "@/schema/CodeShema";
import { ButtonForm } from "@/components/form/ButtonForm";

export const CodeAirForm = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => code_air.post(data),
    onSuccess: () => {
      toast.success("Código aéreo creado correctamente");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CodeAir] });
      form.reset();
    },
    onError: () => {
      toast.error("Error al crear código aéreo");
    },
  });

  const form = useForm<CodeAirValues>({
    resolver: zodResolver(CodeAirSchema),
    defaultValues: {
      createdAt: new Date(),
      activeBy: "",
      operatorId: "",
      location: "",
      emergencyDetail: "",
    },
  });

  const onSubmit = async (data: CodeAirValues) => {
    mutate(data);
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
