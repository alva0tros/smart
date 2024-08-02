import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from "@tanstack/react-query";
import { api } from "@/common/api/instance";

const BASE_URL = "/api";

interface ApiParams {
    beanId: string;
    find?: string;
    save?: string;
    method?: string;
    [key: string]: any;
}

const callApi = async (params: ApiParams): Promise<any> => {
    try {
        const response = await api.post(BASE_URL, params);
        return response.data;
    } catch (e: any) {
        console.log(e);
        throw e;
    }
};

const useApiQuery = (params: ApiParams, options?: Omit<UseQueryOptions<any, any>, "queryKey" | "queryFn">) => {
    const apiKey = `${params.beanId}/${params.find}`;
    const queryParams = { ...params, method: params.find, type: "find" };

    return useQuery({
        queryKey: [apiKey],
        queryFn: () => callApi(queryParams),
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000,
        ...options,
    });
};

const useApiMutation = (params: ApiParams, options?: Omit<UseMutationOptions<any, any, any>, "mutationFn">) => {
    const queryClient = useQueryClient();
    const apiKey = `${params.beanId}/${params.find}`;
    const mutationParams = { ...params, method: params.save };

    return useMutation({
        mutationFn: () => callApi(mutationParams),

        onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries({ queryKey: [apiKey] });
            options?.onSuccess?.(data, variables, context);
        },
        onError: (error, variables, context) => {
            options?.onError?.(error, variables, context);
        },
        ...options,
    });
};

export { useApiQuery, useApiMutation };
