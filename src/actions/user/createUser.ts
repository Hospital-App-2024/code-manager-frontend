"use server";
import { auth } from "@/auth";
import { User } from "@/interfaces/user.interface";
import { UserValues } from "@/schema/adminSchema";
import { revalidateTag } from "next/cache";

export const createUser = async (values: UserValues): Promise<User> => {
  try {
    const session = await auth();

    const response = await fetch(`${process.env.URL_BACKEND}/user`, {
      method: "Post",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al crear el usuario");
    }

    const data = await response.json();
    revalidateTag("users");
    return data;
  } catch (error) {
    throw new Error("Error al crear el usuario");
  }
};
