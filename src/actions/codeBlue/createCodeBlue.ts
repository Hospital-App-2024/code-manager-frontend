"use server";
import { auth } from "@/auth";
import { CodeBlue } from "@/interfaces/codeBlue.interface";
import { CodeBlueValues } from "@/schema/CodeShema";
import { revalidateTag } from "next/cache";

export const createCodeBlue = async (
  values: CodeBlueValues
): Promise<CodeBlue> => {
  try {
    const session = await auth();

    const response = await fetch(`${process.env.URL_BACKEND}/code-blue`, {
      method: "Post",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al crear el código azul");
    }

    const data = await response.json();
    revalidateTag("code-blue");
    return data;
  } catch (error) {
    throw new Error("Error al crear el código azul");
  }
};
