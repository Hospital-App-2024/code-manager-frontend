import { QueryKeys } from "@/interfaces"
import { code_blue, QueryParams } from "@/requests"
import { useQuery } from "@tanstack/react-query"

export const useCodeBlue = (queryParams: QueryParams) => {
    return useQuery({
        queryKey: [QueryKeys.CodeBlue, queryParams],
        queryFn: async () => code_blue.get(queryParams),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}