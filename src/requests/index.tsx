"use client";
import { ResponseCodeBlue } from "@/interfaces/codeBlue.interface";
import { getSession, useSession } from "next-auth/react";

export interface QueryParams {
  limit?: number;
  page?: number;
}

// const base_url = process.env.URL_BACKEND;
const base_url = process.env.NEXT_PUBLIC_URL_BACKEND;

const backend_endpoints = {
  code_blue: `${base_url}/code-blue`,
};

export const code_blue = {
  get: async (params: QueryParams) => {
    const session = await getSession();

    const url = buildUrlWithParams(backend_endpoints.code_blue, params);

    const resp = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
    });

    if (!resp.ok) {
      throw new Error("Error fetching code blue data");
    }

    return (await resp.json()) as ResponseCodeBlue;
  },
};

export const buildUrlWithParams = (baseUrl: string, searchParams?: unknown) => {
  const params = new URLSearchParams();

  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (!value) return;

    params.append(key, String(value));
  });

  const queryString = params.toString();

  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
};
