"use server";
import { auth } from "@/auth";
import { CodeType } from "@/interfaces/emergencyCode.interface";

export const getEmergencyCodeTotalByMonth = async (type?: CodeType) => {
  const session = await auth();
  
  let url = `${process.env.NEXT_PUBLIC_URL_BACKEND || process.env.URL_BACKEND}/emergency-codes/total-by-month`;
  if (type) {
    url += `?type=${type}`;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.token}`,
    },
    next: {
      tags: ["emergency-codes-total", type || "all"],
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
};
