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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CodeRedSchema, CodeRedValues, Team } from "@/schema/CodeShema";
import { DatePicker } from "@/components/form/DatePicker";
import { SelectOperator } from "@/components/form/SelectOperator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { code_red } from "@/requests";
import { QueryKeys } from "@/interfaces";
import { ButtonForm } from "@/components/form/ButtonForm";

export const CodeRedForm = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => code_red.post(data),
    onSuccess: () => {
      toast.success("Código rojo creado exitosamente");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CodeRed] });
      form.reset();
    },
    onError: () => {
      toast.error("Error al crear código rojo");
    },
  });

  const form = useForm<CodeRedValues>({
    resolver: zodResolver(CodeRedSchema),
    defaultValues: {
      activeBy: "",
      COGRID: false,
      createdAt: new Date(),
      firefighterCalledTime: undefined,
      location: "",
      operatorId: "",
    },
  });

  const onSubmit = async (data: CodeRedValues) => {
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

          {/* Fecha y hora */}
          <FormField
            control={form.control}
            name="firefighterCalledTime"
            render={({ field }) => (
              <DatePicker
                title="Hora de llamado a bomberos"
                name={field.name}
                value={field.value ? field.value : undefined}
                onChange={field.onChange}
              />
            )}
          />

          {/* COGRID */}
          <FormField
            control={form.control}
            name="COGRID"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comunicación con COGRID</FormLabel>
                <Select
                  value={field.value ? "1" : "0"}
                  onValueChange={(value) => field.onChange(+value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Sí</SelectItem>
                    <SelectItem value="0">No</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
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

        <ButtonForm isDisabled={isPending} title="Crear" type="submit" />
      </form>
    </Form>
  );
};
