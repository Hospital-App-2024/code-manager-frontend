"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginSchema, LoginValues } from "@/schema/authSchema";
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
import { loginAction } from "@/actions/auth/login.action";
import { ButtonForm } from "@/components/form/ButtonForm";
import { toast } from "sonner";

export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginValues) => {
    startTransition(async () => {
      const resp = await loginAction({
        email: values.email,
        password: values.password,
      });

      if (resp?.error) {
        toast.error(resp.error);
        return;
      }
    });
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>ADM Central</CardTitle>
        <CardDescription>Ingresa tus datos para iniciar sesión</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input placeholder="Correo electrónico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contraseña"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ButtonForm
              isDisabled={isPending}
              title="Iniciar sesión"
              type="submit"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
