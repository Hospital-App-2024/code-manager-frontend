"use server";
import { auth } from "@/auth";
import { Operator } from "@/interfaces/emergencyCode.interface";

export const getOperators = async (): Promise<Operator[]> => {
  const session = await auth();
  const url = `${process.env.NEXT_PUBLIC_URL_BACKEND || process.env.URL_BACKEND}/operator`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.token}`,
    },
    cache: "no-store",
    next: { tags: ["operators"] },
  });

  if (!response.ok) return [];
  return response.json();
};
