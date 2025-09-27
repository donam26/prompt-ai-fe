import { useCallback, useEffect, useState } from "react";
import { userService } from "@/services/admin/users/userService";
import type { User } from "@/lib/types";

interface IResponse {
  user: User | null;
  isLoading: boolean;
  error: string;
  fetchUserDetail: (id: string | number) => Promise<void>;
}

export function useUserDetail(id?: string | number): IResponse {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchUserDetail = useCallback(async (userId: string | number) => {
    setIsLoading(true);
    setError("");
    if (!userId) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await userService.getById(userId);
      setUser(response.data || null);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetchUserDetail(id);
    }
  }, [id, fetchUserDetail]);

  return {
    user,
    isLoading,
    error,
    fetchUserDetail,
  };
}
