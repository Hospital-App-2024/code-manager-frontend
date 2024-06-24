"use server";
import { auth } from "@/auth";
import { ResponseOperator } from "@/interfaces/operator.interface";

interface Props {
  limit: number;
  page: number;
}

export const getOperatorsWithPagination = async ({
  limit,
  page,
}: Props): Promise<ResponseOperator> => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  if (isNaN(Number(limit)) || limit < 1) limit = 5;

  try {
    const session = await auth();

    const response = await fetch(
      `${process.env.URL_BACKEND}/operator/pagination?limit=${limit}&page=${page}`,
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
