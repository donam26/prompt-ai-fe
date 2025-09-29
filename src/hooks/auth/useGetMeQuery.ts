import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/types";

interface UseGetMeQueryResult {
  data: User | undefined;
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

      const response = await userService.getUserById(user.id.toString());
      return response.data.data;
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
