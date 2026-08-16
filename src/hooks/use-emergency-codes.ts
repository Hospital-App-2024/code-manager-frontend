import { QueryKeys } from "@/interfaces";
import { emergency_codes, QueryParams } from "@/requests";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useEmergencyCodes = (queryParams: QueryParams) => {
    return useQuery({
        queryKey: [QueryKeys.EmergencyCodes, queryParams],
        queryFn: async () => emergency_codes.get(queryParams),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        placeholderData: keepPreviousData,
    })
}
