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
import { CodeGreenSchema, CodeGreenValues } from "@/schema/CodeShema";
import { DatePicker } from "@/components/form/DatePicker";
import { SelectOperator } from "@/components/form/SelectOperator";
import { useEffect, useState, useTransition } from "react";
import { createCodeGreen } from "@/actions/codeGreen/createCodeGreen";
import { ButtonForm } from "@/components/form/ButtonForm";
import { getCodeGreenById } from "@/actions/codeGreen/getCodeGreenById";
import { updateCodeGreen } from "@/actions/codeGreen/updateCodeGreen";
import Spinner from "@/components/skeleton/Spinner";

interface Props {
  codeGreenId?: string;
}

export const CodeGreenForm = ({ codeGreenId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isLoaded, setIsLoaded] = useState(true);

  const form = useForm<CodeGreenValues>({
    resolver: zodResolver(CodeGreenSchema),
    defaultValues: {
      createdAt: new Date(),
      police: false,
      activeBy: "",
      operatorId: "",
      location: "",
      event: "",
    },
  });

  useEffect(() => {
    if (codeGreenId) {
      getCodeGreenById({ id: codeGreenId })
        .then((data) => {
          form.setValue("createdAt", new Date(data.createdAt));
          form.setValue("police", data.police);
          form.setValue("activeBy", data.activeBy);
          form.setValue("operatorId", data.operatorId);
          form.setValue("location", data.location);
          form.setValue("event", data.event);
        })
        .catch(() => {
          toast.error("Error al obtener el código verde");
        })
        .finally(() => setIsLoaded(false));
    }
  }, [codeGreenId, form]);

  const onSubmit = async (data: CodeGreenValues) => {
    startTransition(async () => {
      try {
        if (codeGreenId) {
          await updateCodeGreen(codeGreenId, data);
          toast.success("Código verde actualizado correctamente");
          form.reset();
          return;
        }

        await createCodeGreen(data);
        toast.success("Event created successfully");
        form.reset();
      } catch (error) {
        toast.error("Error al realizar la acción");
      }
    });
  };

  if (isLoaded && codeGreenId) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spinner />
      </div>
    );
  }

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

          {/* Carabineros */}
          <FormField
            control={form.control}
            name="police"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carabineros</FormLabel>
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

        {/* Evento */}
        <FormField
          control={form.control}
          name="event"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Evento</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonForm
          isDisabled={isPending}
          title={codeGreenId ? "Editar" : "Crear"}
          type="submit"
        />
      </form>
    </Form>
  );
};
