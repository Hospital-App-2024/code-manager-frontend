"use server";
import { auth } from "@/auth";
import { Operator } from "@/interfaces/operator.interface";
import { OperatorValues } from "@/schema/adminSchema";
import { revalidatePath } from "next/cache";

export const createOperator = async (
  values: OperatorValues
): Promise<Operator> => {
  try {
    const session = await auth();

    const response = await fetch(`${process.env.URL_BACKEND}/operator`, {
      method: "Post",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error al crear el operador");
    }

    const data = await response.json();
    revalidatePath("/admin/operators");
    return data;
  } catch (error) {
    throw new Error("Error al crear el operador");
  }
};
