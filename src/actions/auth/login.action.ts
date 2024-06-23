"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginValues } from "@/schema/authSchema";

export const loginAction = async (values: LoginValues) => {
  const formData = new FormData();
  formData.append("email", values.email);
  formData.append("password", values.password);
  try {
    await signIn("credentials", {
      redirectTo: `/`,
      email: formData.get("email"),
      password: formData.get("password"),
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Credenciales incorrectas",
          };
        default:
          return { error: "Credenciales incorrectas" };
      }
    }

    throw error;
  }
};
