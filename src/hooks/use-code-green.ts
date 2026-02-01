import { QueryKeys } from "@/interfaces"
import { code_green, QueryParams } from "@/requests"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useCodeGreen = (queryParams: QueryParams) => {
    return useQuery({
        queryKey: [QueryKeys.CodeGreen, queryParams],
        queryFn: async () => code_green.get(queryParams),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: keepPreviousData,
    })
}
