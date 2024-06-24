"use server";
import { auth } from "@/auth";
import { ICodeTotalByMonth } from "@/interfaces/codeTotalByMonth.interface";

export const getCodeLeakTotalByMonth = async (): Promise<
  ICodeTotalByMonth[]
> => {
  try {
    const session = await auth();

    const response = await fetch(
      `${process.env.URL_BACKEND}/code-leak/total-by-month`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${session?.token}`,
        },
        next: {
          tags: ["code-leak"],
        },
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error al obtener los datos de la API");
  }
};
