import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ApiResponse } from "@/services/base/types";

interface UseApiMutationOptions<TData, TVariables, TError = unknown> {
  mutationFn: (
    variables: TVariables
  ) => Promise<AxiosResponse<ApiResponse<TData>>>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables
  ) => void;
}

export const useApiMutation = <TData, TVariables, TError = unknown>({
  mutationFn,
  onSuccess,
  onError,
  onSettled,
}: UseApiMutationOptions<TData, TVariables, TError>) => {
  return useMutation({
    mutationFn: async (variables: TVariables) => {
      const response = await mutationFn(variables);
      return response.data.data as TData;
    },
    onSuccess: (data, variables) => {
      onSuccess?.(data, variables);
    },
    onError: (error, variables) => {
      onError?.(error as TError, variables);
    },
    onSettled: (data, error, variables) => {
      onSettled?.(data, error as TError | null, variables);
    },
  });
};
