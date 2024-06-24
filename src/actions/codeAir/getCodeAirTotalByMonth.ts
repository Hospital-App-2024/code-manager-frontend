"use server";
import { auth } from "@/auth";
import { ICodeTotalByMonth } from "@/interfaces/codeTotalByMonth.interface";

export const getCodeAirTotalByMonth = async (): Promise<
  ICodeTotalByMonth[]
> => {
  try {
    const session = await auth();

    const response = await fetch(
      `${process.env.URL_BACKEND}/code-air/total-by-month`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${session?.token}`,
        },
        next: {
          tags: ["code-air"],
        },
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error al obtener los datos de la API");
  }
};
