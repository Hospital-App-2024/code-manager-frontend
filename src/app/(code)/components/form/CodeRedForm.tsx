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
import { useTransition } from "react";
import { ButtonForm } from "@/components/form/ButtonForm";
import { createCodeRed } from "@/actions/codeRed/createCodeGreen";

export const CodeRedForm = () => {
  const [isPending, startTransition] = useTransition();
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
    startTransition(async () => {
      try {
        await createCodeRed(data);
        toast.success("Código rojo creado exitosamente");
        form.reset();
      } catch (error) {
        toast.error("Error al crear código rojo");
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

          {/* Fecha y hora */}
          <FormField
            control={form.control}
            name="firefighterCalledTime"
            render={({ field }) => (
              <DatePicker
                title="Hora de llamado a bomberos"
                name={field.name}
                value={field.value}
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
