"use server";
import { auth } from "@/auth";
import { ResponseDevice } from "@/interfaces/fireAlarms.interface";

interface Props {
  limit: number;
  page: number;
  nodo?: string;
  search?: string;
}

export const getDevice = async ({
  limit,
  page,
  nodo,
  search,
}: Props): Promise<ResponseDevice> => {
  if (isNaN(Number(page)) || page < 1) page = 1;
  if (isNaN(Number(limit)) || limit < 1) limit = 5;

  try {
    const session = await auth();

    let url = `${process.env.URL_BACKEND}/fire-alarms?`;

    const params = new URLSearchParams();
    if (nodo) params.append("nodo", nodo);
    if (search) params.append("search", search);

    url += `limit=${limit}&page=${page}&${params.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.token}`,
      },
      next: {
        tags: ["fire-alarms"],
      },
      cache: "no-cache",
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Error al obtener los datos de los dispositivos.");
  }
};
