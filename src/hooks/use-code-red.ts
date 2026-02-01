import { QueryKeys } from "@/interfaces"
import { code_red, QueryParams } from "@/requests"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useCodeRed = (queryParams: QueryParams) => {
    return useQuery({
        queryKey: [QueryKeys.CodeRed, queryParams],
        queryFn: async () => code_red.get(queryParams),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: keepPreviousData,
    })
}
