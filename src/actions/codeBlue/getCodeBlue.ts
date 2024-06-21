"use server";
import { ResponseCodeBlue } from "@/interfaces/codeBlue.interface";

interface Props {
    limit: number;
    page: number;
}

export const getCodeBlue = async ({ limit, page }: Props): Promise<ResponseCodeBlue> => {

    if (isNaN(Number(page)) || page < 1) page = 1;
    if (isNaN(Number(limit)) || limit < 1) limit = 5;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_BACKEND}/code-blue?limit=${limit}&page=${page}`,
            {
                method: 'GET',
                next: {
                    tags: ['code-blue']
                }
            }
        );

        const data = await response.json();

        return data;

    } catch (error) {
        throw new Error('Error al obtener los datos de la tabla de código azul');
    }
}