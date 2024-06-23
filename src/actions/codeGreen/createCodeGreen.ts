"use server";
import { auth } from "@/auth";
import type { CodeGreen } from "@/interfaces/codeGreen.interface";
import type { CodeGreenValues } from "@/schema/CodeShema";
import { revalidateTag } from "next/cache";

export const createCodeGreen = async (
  values: CodeGreenValues
): Promise<CodeGreen> => {
  try {
    const session = await auth();

    const response = await fetch(`${process.env.URL_BACKEND}/code-green`, {
      method: "Post",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al crear el código verde");
    }

    const data = await response.json();
    revalidateTag("code-green");
    return data;
  } catch (error) {
    throw new Error("Error al crear el código verde");
  }
};
