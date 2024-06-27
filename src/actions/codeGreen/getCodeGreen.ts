"use server";
import { auth } from "@/auth";
import { ResponseCodeGreen } from "@/interfaces/codeGreen.interface";
import { format } from "date-fns";

interface Props {
  limit: number;
  page: number;
  from?: string;
  to?: string;
}

export const getCodeGreen = async ({
  limit,
  page,
  from,
  to,
}: Props): Promise<ResponseCodeGreen> => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  if (isNaN(Number(limit)) || limit < 1) limit = 5;

  const session = await auth();

  let url = `${process.env.URL_BACKEND}/code-green?`;

  const params = new URLSearchParams();
  if (from) params.append("from", from);
  if (to) params.append("to", to);

  url += `limit=${limit}&page=${page}&${params}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.token}`,
    },
    next: {
      tags: ["code-green"],
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
};
