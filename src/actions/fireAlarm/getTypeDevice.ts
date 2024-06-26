"use server";
import { auth } from "@/auth";
import { ITypeDevice } from "@/interfaces/fireAlarms.interface";

export const getTypeDevice = async (): Promise<ITypeDevice[]> => {
  try {
    const session = await auth();

    const response = await fetch(
      `${process.env.URL_BACKEND}/fire-alarms/type-device`,
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
      throw new Error("Error al obtener los tipos de dispositivos");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error al obtener los tipos de dispositivos");
  }
};
