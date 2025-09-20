import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services";
import { queryKeys } from "@/types";
import { useAuth } from "@/hooks/useAuth";

// Custom hook for fetching user data
export const useUser = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.user,
    queryFn: () => userService.getMe({ userId: String(user?.id) }),
    enabled: !!user?.id, // Only fetch when user ID is available
  });
};
