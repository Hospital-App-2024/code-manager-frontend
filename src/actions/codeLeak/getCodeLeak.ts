"use server";
import { auth } from "@/auth";
import { ResponseCodeLeak } from "@/interfaces/codeLeak.interface";

interface Props {
  limit: number;
  page: number;
}

export const getCodeLeak = async ({
  limit,
  page,
}: Props): Promise<ResponseCodeLeak> => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  if (isNaN(Number(limit)) || limit < 1) limit = 5;

  try {
    const session = await auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/code-leak?limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
    throw new Error("Error al obtener los datos de la tabla de código aéreo");
  }
};
