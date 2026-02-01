"use client";
import { useForm, useWatch } from "react-hook-form";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { code_green } from "@/requests";
import { QueryKeys } from "@/interfaces";
import { CodeGreenSchema, CodeGreenValues } from "@/schema/CodeShema";
import { DatePicker } from "@/components/form/DatePicker";
import { SelectOperator } from "@/components/form/SelectOperator";
import { ButtonForm } from "@/components/form/ButtonForm";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ShieldAlertIcon,
  MegaphoneIcon,
} from "lucide-react";

export const CodeGreenCreateForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => code_green.post(data),
    onSuccess: () => {
      toast.success("Código verde activado y registrado correctamente");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CodeGreen] });
      router.push("/code-green");
    },
    onError: () => {
      toast.error("Error al registrar el código verde");
    },
  });

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

  const locationValue = useWatch({ control: form.control, name: "location" });

  const onSubmit = async (data: CodeGreenValues) => {
    mutate(data);
  };

  return (
    <div className="w-full space-y-6 pb-6">
      {/* SECCIÓN SUPERIOR: MENSAJE PARA ALTAVOZ */}
      <Card className="bg-slate-900 text-white border-2 border-green-500 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <MegaphoneIcon size={180} />
        </div>
        <CardHeader>
          <CardTitle className="text-green-400 font-mono tracking-widest flex items-center gap-3 text-sm md:text-base">
            <MegaphoneIcon className="animate-pulse" />
            MENSAJE PARA VOCEO (ALTAVOZ)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black/40 p-6 md:p-10 rounded-xl border border-green-500/20 text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight uppercase">
              <span className="text-red-500 animate-pulse inline-block mr-2 text-3xl md:text-5xl">
                ●
              </span>
              ACTIVACIÓN CÓDIGO VERDE{" "}
              <br className="hidden md:block" />
              {locationValue ? (
                <span className="text-white mt-4 inline-block">
                  {locationValue}
                </span>
              ) : (
                <span className="text-slate-600 italic block mt-4">
                  [INGRESE UBICACIÓN]
                </span>
              )}
            </h2>
            <p className="mt-8 text-green-400/60 font-medium text-xs md:text-sm uppercase tracking-[0.2em]">
              Repetir este mensaje claramente 3 veces por el sistema de
              altavoces
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {/* FORMULARIO PRINCIPAL */}
        <div className="xl:col-span-2">
          <Card className="shadow-xl border-t-8 border-t-green-600 h-full">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-2xl flex items-center gap-3 text-slate-800">
                <ShieldAlertIcon className="text-green-600" />
                Registro de Activación Código Verde
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Form {...form}>
                <form
                  className="space-y-3"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
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

                    {/* Carabineros */}
                    <FormField
                      control={form.control}
                      name="police"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Carabineros</FormLabel>
                          <Select
                            value={field.value ? "1" : "0"}
                            onValueChange={(value) => field.onChange(value === "1")}
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
                    title="Crear"
                    type="submit"
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
