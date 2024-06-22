"use server";
import { CodeRed } from "@/interfaces/codeRed.interface";
import { CodeRedValues } from "@/schema/CodeShema";
import { revalidateTag } from "next/cache";

export const createCodeRed = async (
  values: CodeRedValues
): Promise<CodeRed> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/code-red`,
      {
        method: "Post",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear el código rojo");
    }

    const data = await response.json();
    revalidateTag("code-red");
    return data;
  } catch (error) {
    throw new Error("Error al crear el código rojo");
  }
};
