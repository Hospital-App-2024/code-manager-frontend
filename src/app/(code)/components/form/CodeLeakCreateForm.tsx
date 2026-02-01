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
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { code_leak } from "@/requests";
import { QueryKeys } from "@/interfaces";
import { codeLeakSchema, CodeLeakValues } from "@/schema/CodeShema";
import { DatePicker } from "@/components/form/DatePicker";
import { SelectOperator } from "@/components/form/SelectOperator";
import { ButtonForm } from "@/components/form/ButtonForm";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MegaphoneIcon,
  SearchIcon,
  UserIcon,
} from "lucide-react";

export const CodeLeakCreateForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => code_leak.post(data),
    onSuccess: () => {
      toast.success("Código de fuga activado y registrado correctamente");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CodeLeak] });
      router.push("/code-leak");
    },
    onError: () => {
      toast.error("Error al registrar el código de fuga");
    },
  });

  const form = useForm<CodeLeakValues>({
    resolver: zodResolver(codeLeakSchema),
    defaultValues: {
      createdAt: new Date(),
      activeBy: "",
      operatorId: "",
      location: "",
      patientName: "",
      patientDescription: "",
    },
  });

  const locationValue = useWatch({ control: form.control, name: "location" });
  const patientNameValue = useWatch({ control: form.control, name: "patientName" });
  const patientDescriptionValue = useWatch({ control: form.control, name: "patientDescription" });

  const onSubmit = async (data: CodeLeakValues) => {
    mutate(data);
  };

  return (
    <div className="w-full space-y-6 pb-6">
      {/* SECCIÓN SUPERIOR: MENSAJE PARA ALTAVOZ */}
      <Card className="bg-slate-900 text-white border-2 border-yellow-500 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <MegaphoneIcon size={180} />
        </div>
        <CardHeader>
          <CardTitle className="text-yellow-400 font-mono tracking-widest flex items-center gap-3 text-sm md:text-base">
            <MegaphoneIcon className="animate-pulse" />
            MENSAJE PARA VOCEO (ALTAVOZ)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black/40 p-6 md:p-10 rounded-xl border border-yellow-500/20 text-center relative z-10">
            <h2 className="text-xl md:text-3xl font-black leading-tight tracking-tight uppercase">
              <span className="text-red-500 animate-pulse inline-block mr-2 text-2xl md:text-4xl">
                ●
              </span>
              BÚSQUEDA SECUNDARIA ACTIVA
            </h2>
            <div className="mt-6 text-lg md:text-2xl font-bold uppercase tracking-tight leading-relaxed">
              PACIENTE:{" "}
              {patientNameValue ? (
                <span className="text-yellow-500">{patientNameValue}</span>
              ) : (
                <span className="text-slate-600 italic">[NOMBRE]</span>
              )}{" "}
              DEL SERVICIO DE:{" "}
              {locationValue ? (
                <span className="text-yellow-500">{locationValue}</span>
              ) : (
                <span className="text-slate-600 italic">[SERVICIO]</span>
              )}{" "}
              {patientDescriptionValue ? (
                <span className="text-yellow-500">{patientDescriptionValue}</span>
              ) : (
                <span className="text-slate-600 italic">[CARACTERÍSTICAS Y VESTIMENTA]</span>
              )}
            </div>
            <p className="mt-8 text-yellow-400/60 font-medium text-xs md:text-sm uppercase tracking-[0.2em]">
              Repetir este mensaje claramente 3 veces por el sistema de
              altavoces
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {/* FORMULARIO PRINCIPAL */}
        <div className="xl:col-span-2">
          <Card className="shadow-xl border-t-8 border-t-yellow-600 h-full">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-2xl flex items-center gap-3 text-slate-800">
                <SearchIcon className="text-yellow-600" />
                Registro de Activación Código Fuga
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

                    {/* Nombre del Paciente */}
                    <FormField
                      control={form.control}
                      name="patientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre del Paciente</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Servicio (Ubicación) */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Servicio / Ubicación</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ej: Pediatría, Urgencias..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Descripción / Vestimenta */}
                  <FormField
                    control={form.control}
                    name="patientDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Características físicas y de vestimenta</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="resize-none" 
                            {...field} 
                            placeholder="Describa contextura, altura, ropa que vestía al momento de la fuga..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <ButtonForm
                    isDisabled={isPending}
                    title="Activar Búsqueda"
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
