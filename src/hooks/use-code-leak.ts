import { QueryKeys } from "@/interfaces"
import { code_leak, QueryParams } from "@/requests"
import { keepPreviousData, useQuery } from "@tanstack/react-query"

export const useCodeLeak = (queryParams: QueryParams) => {
    return useQuery({
        queryKey: [QueryKeys.CodeLeak, queryParams],
        queryFn: async () => code_leak.get(queryParams),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: keepPreviousData,
    })
}
