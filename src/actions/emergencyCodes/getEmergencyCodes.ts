"use server";
import { auth } from "@/auth";
import { ResponseEmergencyCode, CodeType } from "@/interfaces/emergencyCode.interface";

interface Props {
  limit: number;
  page: number;
  from?: string;
  to?: string;
  type?: CodeType;
}

export const getEmergencyCodes = async ({
  limit,
  page,
  from,
  to,
  type,
}: Props): Promise<ResponseEmergencyCode> => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  if (isNaN(Number(limit)) || limit < 1) limit = 5;

  const session = await auth();

  let url = `${process.env.NEXT_PUBLIC_URL_BACKEND || process.env.URL_BACKEND}/emergency-codes?`;

  const params = new URLSearchParams();
  if (from) params.append("from", from);
  if (to) params.append("to", to);
  if (type) params.append("type", type);

  url += `limit=${limit}&page=${page}&${params}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json();
};
