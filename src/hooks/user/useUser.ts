import { useQuery } from "@tanstack/react-query";
import { userService } from "@/services";
import { queryKeys } from "../shared/types";

// Custom hook for fetching user data
export const useUser = () => {
  return useQuery({
    queryKey: queryKeys.user,
    queryFn: userService.getUser,
    enabled: false, // Only fetch when explicitly called
  });
};
