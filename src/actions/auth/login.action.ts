"use server";
import { signIn } from "@/auth";
import { LoginValues } from "@/schema/authSchema";

export const loginAction = async (values: LoginValues) => {
  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("password", values.password);
  
  await signIn("credentials", {
    email: values.email,
    password: values.password,
  })
  
};
