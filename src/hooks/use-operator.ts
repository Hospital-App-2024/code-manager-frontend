import { useQuery } from "@tanstack/react-query";
import { getOperators } from "@/actions/operator/getOperators";

export const useOperator = () => {
    return useQuery({
        queryKey: ["operators"],
        queryFn: async () => getOperators(),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    });
};
