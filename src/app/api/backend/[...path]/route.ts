import { NextRequest } from "next/server";

// El navegador llama a /api/backend/... (mismo origen) y el servidor de Next reenvía la
// petición a URL_BACKEND, que se lee en tiempo de ejecución. Así la URL del backend no queda
// fija en el bundle ni necesita ser accesible desde la red de los usuarios.
export const dynamic = "force-dynamic";

const FORWARDED_REQUEST_HEADERS = ["authorization", "content-type", "accept"];
const FORWARDED_RESPONSE_HEADERS = ["content-type", "content-disposition"];

async function forward(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const url = `${process.env.URL_BACKEND}/${path
    .map(encodeURIComponent)
    .join("/")}${req.nextUrl.search}`;

  const headers = new Headers();
  for (const name of FORWARDED_REQUEST_HEADERS) {
    const value = req.headers.get(name);
    if (value) headers.set(name, value);
  }

  const hasBody = req.method !== "GET" && req.method !== "HEAD";
  const resp = await fetch(url, {
    method: req.method,
    headers,
    body: hasBody ? await req.arrayBuffer() : undefined,
    cache: "no-store",
  });

  const responseHeaders = new Headers();
  for (const name of FORWARDED_RESPONSE_HEADERS) {
    const value = resp.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }

  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers: responseHeaders,
  });
}

export const GET = forward;
export const POST = forward;
export const PATCH = forward;
export const PUT = forward;
export const DELETE = forward;
