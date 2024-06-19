"use server";
import { LoginValues } from "@/schema/authSchema";
import { signIn } from "next-auth/react";

export const loginAction = async (values: LoginValues) => {
  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("password", values.password);
  
  await signIn("credentials", {
    redirect: false,
    email: values.email,
    password: values.password,
  })
  
};
