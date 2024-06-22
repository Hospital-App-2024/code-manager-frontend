"use server";
import { CodeLeak } from "@/interfaces/codeLeak.interface";
import { CodeLeakValues } from "@/schema/CodeShema";
import { revalidateTag } from "next/cache";

export const createCodeLeak = async (
  values: CodeLeakValues
): Promise<CodeLeak> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/code-leak`,
      {
        method: "Post",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear el código de fuga");
    }

    const data = await response.json();
    revalidateTag("code-leak");
    return data;
  } catch (error: any) {
    throw new Error(error?.message || "Error al crear el código de fuga");
  }
};
