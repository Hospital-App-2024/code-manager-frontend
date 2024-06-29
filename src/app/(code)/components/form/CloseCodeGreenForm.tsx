"use client";
import { closeCodeGreen } from "@/actions/codeGreen/closeCodeGreen";
import { ButtonForm } from "@/components/form/ButtonForm";
import { DatePicker } from "@/components/form/DatePicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CloseCodeGreenSchema, CloseCodeGreenValues } from "@/schema/CodeShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  codeGreenId: string;
}

export function CloseCodeGreenForm({ codeGreenId }: Props) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CloseCodeGreenValues>({
    resolver: zodResolver(CloseCodeGreenSchema),
    defaultValues: {
      closedAt: new Date(),
      closedBy: "",
      observations: "",
    },
  });

  const onSubmit = async (data: CloseCodeGreenValues) => {
    startTransition(async () => {
      try {
        await closeCodeGreen(codeGreenId, data);
        toast.success("Código Verde cerrado correctamente");
        form.reset();
      } catch (error) {
        toast.error("Error al cerrar el código verde");
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-3 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="closedBy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Finalizado por</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Juan Perez" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="closedAt"
            render={({ field }) => (
              <DatePicker
                name={field.name}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observación</FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ButtonForm isDisabled={isPending} title="Finalizar" type="submit" />
      </form>
    </Form>
  );
}
