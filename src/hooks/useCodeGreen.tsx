import { ResponseCodeGreen } from "@/interfaces/codeGreen.interface";
import { useQuery } from "@tanstack/react-query";
import type { PaginationState } from "@tanstack/react-table";

interface Props {
    pagination: PaginationState;
    from?: Date;
    to?: Date;
}

const fetchCodeGreenTable = async ({ pagination }: Props) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/code-green?limit=${pagination.pageSize}&page=${pagination.pageIndex + 1}`, {
        cache: 'no-cache',
    });
    const data = await response.json() as ResponseCodeGreen;
    return {
        rows: data.data,
        pageCount: data.meta.lastPage,
        rowCount: data.meta.total,
    };
}

export const useCodeGreen = (pagination: PaginationState) => {
    const query = useQuery({
        queryKey: ['codeGreenTable', pagination],
        queryFn: () => fetchCodeGreenTable({pagination}),
    });

    return {
    ...query,
    }
    

}