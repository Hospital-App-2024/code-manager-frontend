"use server";
import { auth } from "@/auth";
import { INodo } from "@/interfaces/fireAlarms.interface";

export const getNodo = async (): Promise<INodo[]> => {
  try {
    const session = await auth();

    const response = await fetch(
      `${process.env.URL_BACKEND}/fire-alarms/nodo`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.token}`,
        },
        next: {
          tags: ["fire-alarms"],
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener los nodos");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error al obtener los nodos");
  }
};
