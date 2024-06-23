"use server";
import { auth } from "@/auth";
import { User } from "@/interfaces/user.interface";
import { revalidateTag } from "next/cache";

export const changeUserStatus = async (
  id: string,
  isActive: boolean
): Promise<User> => {
  try {
    const session = await auth();

    const response = await fetch(`${process.env.URL_BACKEND}/user/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ isActive }),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    const data = await response.json();
    revalidateTag("users");
    return data;
  } catch (error) {
    throw new Error("Error al actualizar el usuario");
  }
};
