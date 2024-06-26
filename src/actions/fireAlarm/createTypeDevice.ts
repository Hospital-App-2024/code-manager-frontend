"use server";
import { auth } from "@/auth";
import { TypeDeviceValues } from "@/schema/CodeShema";
import { revalidateTag } from "next/cache";

export const createTypeDevice = async (values: TypeDeviceValues) => {
  try {
    const session = await auth();

    const response = await fetch(
      `${process.env.URL_BACKEND}/fire-alarms/type-device`,
      {
        method: "Post",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${session?.token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al crear el dispositivo");
    }

    const data = await response.json();
    revalidateTag("fire-alarms");
    return data;
  } catch (error) {
    throw new Error("Error al crear el dispositivo");
  }
};
