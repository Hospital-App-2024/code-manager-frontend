"use client";
import { getSession } from "next-auth/react";
import { ResponseEmergencyCode, CodeType } from "@/interfaces/emergencyCode.interface";

export interface QueryParams {
  limit?: number;
  page?: number;
  from?: string;
  to?: string;
  type?: CodeType;
}

const base_url = process.env.NEXT_PUBLIC_URL_BACKEND;
const endpoint = `${base_url}/emergency-codes`;

export const buildUrlWithParams = (baseUrl: string, searchParams?: unknown) => {
  const params = new URLSearchParams();

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    params.append(key, String(value));
  });

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};

export const emergency_codes = {
  get: async (params: QueryParams): Promise<ResponseEmergencyCode> => {
    const session = await getSession();
    const url = buildUrlWithParams(endpoint, params);

    const resp = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
    });

    if (!resp.ok) {
      throw new Error(`Error fetching emergency codes: ${resp.statusText}`);
    }

    return await resp.json();
  },

  post: async (data: any) => {
    const session = await getSession();
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      throw new Error(`Error creating emergency code: ${resp.statusText}`);
    }

    return await resp.json();
  },

  patch: async (id: string, data: any) => {
    const session = await getSession();
    const resp = await fetch(`${endpoint}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      throw new Error(`Error updating emergency code: ${resp.statusText}`);
    }

    return await resp.json();
  },
};
