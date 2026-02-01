"use client";
import { ResponseCodeBlue } from "@/interfaces/codeBlue.interface";
import { ResponseCodeAir } from "@/interfaces/codeAir.interface";
import { ResponseCodeLeak } from "@/interfaces/codeLeak.interface";
import { ResponseCodeGreen } from "@/interfaces/codeGreen.interface";
import { ResponseCodeRed } from "@/interfaces/codeRed.interface";
import { getSession } from "next-auth/react";

export interface QueryParams {
  limit?: number;
  page?: number;
  from?: string;
  to?: string;
}

// const base_url = process.env.URL_BACKEND;
const base_url = process.env.NEXT_PUBLIC_URL_BACKEND;

const backend_endpoints = {
  code_blue: `${base_url}/code-blue`,
  code_green: `${base_url}/code-green`,
  code_red: `${base_url}/code-red`,
  code_air: `${base_url}/code-air`,
  code_leak: `${base_url}/code-leak`,
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
  post: async (data: any) => {
    const session = await getSession();
    const resp = await fetch(backend_endpoints.code_blue, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      throw new Error("Error creating code blue");
    }

    return await resp.json();
  },
};

export const code_green = {
  get: async (params: QueryParams) => {
    const session = await getSession();

    const url = buildUrlWithParams(backend_endpoints.code_green, params);

    const resp = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
    });

    if (!resp.ok) {
      throw new Error("Error fetching code green data");
    }

    return (await resp.json()) as ResponseCodeGreen;
  },
  post: async (data: any) => {
    const session = await getSession();
    const resp = await fetch(backend_endpoints.code_green, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      throw new Error("Error creating code green");
    }

    return await resp.json();
  },
};

export const code_red = {
  get: async (params: QueryParams) => {
    const session = await getSession();

    const url = buildUrlWithParams(backend_endpoints.code_red, params);

    const resp = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
    });

    if (!resp.ok) {
      throw new Error("Error fetching code red data");
    }

    return (await resp.json()) as ResponseCodeRed;
  },
  post: async (data: any) => {
    const session = await getSession();
    const resp = await fetch(backend_endpoints.code_red, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      throw new Error("Error creating code red");
    }

    return await resp.json();
  },
};

export const code_air = {
  get: async (params: QueryParams) => {
    const session = await getSession();

    const url = buildUrlWithParams(backend_endpoints.code_air, params);

    const resp = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
    });

    if (!resp.ok) {
      throw new Error("Error fetching code air data");
    }

    return (await resp.json()) as ResponseCodeAir;
  },
  post: async (data: any) => {
    const session = await getSession();
    const resp = await fetch(backend_endpoints.code_air, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      throw new Error("Error creating code air");
    }

    return await resp.json();
  },
};

export const code_leak = {
  get: async (params: QueryParams) => {
    const session = await getSession();

    const url = buildUrlWithParams(backend_endpoints.code_leak, params);

    const resp = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
    });

    if (!resp.ok) {
      throw new Error("Error fetching code leak data");
    }

    return (await resp.json()) as ResponseCodeLeak;
  },
  post: async (data: any) => {
    const session = await getSession();
    const resp = await fetch(backend_endpoints.code_leak, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.token}`,
      },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      throw new Error("Error creating code leak");
    }

    return await resp.json();
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
