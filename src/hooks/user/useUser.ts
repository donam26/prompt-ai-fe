import { useState, useEffect, useCallback } from "react";
import { userService } from "@/services";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/types";

// Custom hook for fetching user data
export const useUser = () => {
  const { user } = useAuth();
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    if (!user?.id) {
      setData(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await userService.getUserById(user.id.toString());
      setData(response.data);
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("Failed to fetch user");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchUser,
  };
};
