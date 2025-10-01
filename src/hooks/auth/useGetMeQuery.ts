import { useCallback, useEffect, useState } from "react";
import { userService } from "@/services";
import { useAuth } from "@/hooks/useAuth";
import type { User } from "@/types";

interface UseGetMeQueryResult {
  data: User | undefined;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useGetMeQuery = (): UseGetMeQueryResult => {
  const { user } = useAuth();
  const [data, setData] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    if (!user?.id) {
      setError("User ID is required");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await userService.getUserById(user.id.toString());
      setData(response.data.data?.data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      setData(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchUser();
    }
  }, [user?.id, fetchUser]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchUser,
  };
};
