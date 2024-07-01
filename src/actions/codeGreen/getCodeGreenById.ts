"use server";
import { auth } from "@/auth";
import { CodeGreenByID } from "@/interfaces/codeGreen.interface";

interface Props {
  id: string;
}

export const getCodeGreenById = async ({
  id,
}: Props): Promise<CodeGreenByID> => {
  const session = await auth();

  const response = await fetch(`${process.env.URL_BACKEND}/code-green/${id}`, {
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
