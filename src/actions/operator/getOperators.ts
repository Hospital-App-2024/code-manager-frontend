"use server";
import { auth } from "@/auth";
import { Operator } from "@/interfaces/operator.interface";

export const getOperators = async (): Promise<Operator[]> => {
  try {
    const session = await auth();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/operator`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.token}`,
        },
        next: {
          tags: ["operator"],
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los operadores");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error al obtener los operadores");
  }
};
