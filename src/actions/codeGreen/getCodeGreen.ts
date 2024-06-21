"use server";
import { ResponseCodeGreen } from "@/interfaces/codeGreen.interface";

interface Props {
    limit: number;
    page: number;
}

export const getCodeGreen = async ({ limit, page }: Props): Promise<ResponseCodeGreen> => {

    if (isNaN(Number(page)) || page < 1) page = 1;
    if (isNaN(Number(limit)) || limit < 1) limit = 5;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_BACKEND}/code-green?limit=${limit}&page=${page}`,
            {
                method: 'GET',
                next: {
                    tags: ['code-green']
                }
            }
        );

        const data = await response.json();

        return data;

    } catch (error) {
        throw new Error('Error al obtener los datos de la tabla de código verde');
    }
}