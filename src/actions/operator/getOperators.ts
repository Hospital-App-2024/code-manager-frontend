"use server";
import { Operator } from "@/interfaces/operator.interface";

export const getOperators = async (): Promise<Operator[]> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL_BACKEND}/operator`,
            {
               method: 'GET',
               next: {
                tags: ['operator']
               } 
            }
        );

        const data = await response.json();

        return data;

    } catch (error) {
        throw new Error('Error al obtener los operadores');
    }
}