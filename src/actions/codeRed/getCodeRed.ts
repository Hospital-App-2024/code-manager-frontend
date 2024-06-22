"use server";
import { ResponseCodeRed } from "@/interfaces/codeRed.interface";

interface Props {
  limit: number;
  page: number;
}

export const getCodeRed = async ({
  limit,
  page,
}: Props): Promise<ResponseCodeRed> => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  if (isNaN(Number(limit)) || limit < 1) limit = 5;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/code-red?limit=${limit}&page=${page}`,
      {
        method: "GET",
        next: {
          tags: ["code-red"],
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error al obtener los datos de la tabla de código rojo");
  }
};
