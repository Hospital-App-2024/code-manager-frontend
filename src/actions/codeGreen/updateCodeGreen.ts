"use server";
import { auth } from "@/auth";
import type { CodeGreen } from "@/interfaces/codeGreen.interface";
import type { CodeGreenValues } from "@/schema/CodeShema";
import { revalidateTag } from "next/cache";

export const updateCodeGreen = async (
  id: string,
  values: CodeGreenValues
): Promise<CodeGreen> => {
  const session = await auth();

  const response = await fetch(`${process.env.URL_BACKEND}/code-green/${id}`, {
    method: "PATCH",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${session?.token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al cerrar el código verde");
  }

  const data = await response.json();
  revalidateTag("code-green");
  return data;
};
