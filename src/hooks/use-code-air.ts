import { QueryKeys } from "@/interfaces"
import { code_air, QueryParams } from "@/requests"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useCodeAir = (queryParams: QueryParams) => {
    return useQuery({
        queryKey: [QueryKeys.CodeAir, queryParams],
        queryFn: async () => code_air.get(queryParams),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: keepPreviousData,
    })
}
