import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services";
import { useAuth } from "@/hooks/useAuth";
import type { UserGetMeResponse } from "@/types";

interface UseGetMeQueryResult {
  data: UserGetMeResponse["data"] | undefined;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useGetMeQuery = (): UseGetMeQueryResult => {
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user", "me", user?.id],
    queryFn: async () => {
      if (!user?.id) {
        throw new Error("User ID is required");
      }

      const response = await userService.getMe({ userId: String(user.id) });
      return response.data as unknown as UserGetMeResponse;
    },
    enabled: !!user?.id, // Only run query when user ID is available
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return {
    data: data?.data,
    isLoading,
    error: error?.message || null,
    refetch,
  };
};
