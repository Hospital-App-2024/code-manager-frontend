"use server";
import { auth } from "@/auth";
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

  const session = await auth();

  const response = await fetch(
    `${process.env.URL_BACKEND}/code-red?limit=${limit}&page=${page}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.token}`,
      },
      next: {
        tags: ["code-red"],
      },
    }
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
};
