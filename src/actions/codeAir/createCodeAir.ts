"use server";
import { CodeAir } from "@/interfaces/codeAir.interface";
import { CodeAirValues } from "@/schema/CodeShema";
import { revalidateTag } from "next/cache";

export const createCodeAir = async (
  values: CodeAirValues
): Promise<CodeAir> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_BACKEND}/code-air`,
      {
        method: "Post",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear el código aéreo");
    }

    const data = await response.json();
    revalidateTag("code-air");
    return data;
  } catch (error: any) {
    throw new Error(error?.message || "Error al crear el código aéreo");
  }
};
