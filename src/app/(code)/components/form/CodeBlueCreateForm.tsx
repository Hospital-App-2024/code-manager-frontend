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
import { CodeBlueSchema, CodeBlueValues, Team } from "@/schema/CodeShema";
import { DatePicker } from "@/components/form/DatePicker";
import { SelectOperator } from "@/components/form/SelectOperator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { code_blue } from "@/requests";
import { QueryKeys } from "@/interfaces";
import { ButtonForm } from "@/components/form/ButtonForm";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ActivityIcon,
  MegaphoneIcon,
} from "lucide-react";

export const CodeBlueCreateForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => code_blue.post(data),
    onSuccess: () => {
      toast.success("Código azul activado y registrado correctamente");
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CodeBlue] });
      router.push("/code-blue");
    },
    onError: () => {
      toast.error("Error al registrar el código azul");
    },
  });

  const form = useForm<CodeBlueValues>({
    resolver: zodResolver(CodeBlueSchema),
    defaultValues: {
      createdAt: new Date(),
      team: undefined,
      activeBy: "",
      operatorId: "",
      location: "",
    },
  });

  const teamValue = useWatch({ control: form.control, name: "team" });
  const locationValue = useWatch({ control: form.control, name: "location" });

  const onSubmit = async (data: CodeBlueValues) => {
    mutate(data);
  };

  return (
    <div className="w-full space-y-6 pb-6">
      {/* SECCIÓN SUPERIOR: MENSAJE PARA ALTAVOZ */}
      <Card className="bg-slate-900 text-white border-2 border-blue-500 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <MegaphoneIcon size={180} />
        </div>
        <CardHeader>
          <CardTitle className="text-blue-400 font-mono tracking-widest flex items-center gap-3 text-sm md:text-base">
            <MegaphoneIcon className="animate-pulse" />
            MENSAJE PARA VOCEO (ALTAVOZ)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black/40 p-6 md:p-10 rounded-xl border border-blue-500/20 text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight uppercase">
              <span className="text-red-500 animate-pulse inline-block mr-2 text-3xl md:text-5xl">
                ●
              </span>
              ACTIVACIÓN CÓDIGO AZUL{" "}
              {teamValue ? (
                <span className="text-blue-500 border-b-4 border-blue-500 px-2 italic">
                  EQUIPO {teamValue}
                </span>
              ) : (
                <span className="text-slate-600 italic">
                  [SELECCIONE EQUIPO]
                </span>
              )}{" "}
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
            <p className="mt-8 text-blue-400/60 font-medium text-xs md:text-sm uppercase tracking-[0.2em]">
              Repetir este mensaje claramente 3 veces por el sistema de
              altavoces
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6">
        {/* FORMULARIO PRINCIPAL */}
        <div className="xl:col-span-2">
          <Card className="shadow-xl border-t-8 border-t-blue-600 h-full">
            <CardHeader className="border-b bg-slate-50/50">
              <CardTitle className="text-2xl flex items-center gap-3 text-slate-800">
                <ActivityIcon className="text-blue-600" />
                Registro de Activación
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

                    {/* Equipo */}
                    <FormField
                      control={form.control}
                      name="team"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Equipo</FormLabel>
                          <Select
                            value={field.value || ""}
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona una opción" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(Team).map(([key, value]) => (
                                <SelectItem key={key} value={value}>
                                  {value}
                                </SelectItem>
                              ))}
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
