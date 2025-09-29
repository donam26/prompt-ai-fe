import type { User } from "@/types";
import { useCallback, useState } from "react";
import { userService } from "@/services/admin/users/userService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (user: User) => Promise<boolean>;
}

export function useDeleteUser(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(async (user: User): Promise<boolean> => {
    setIsLoading(() => true);
    setError(() => "");

    try {
      await userService.deleteUser(user.id.toString());
      showToast.success("User deleted successfully!");
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete user";
      setError(() => errorMessage);
      showToast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(() => false);
    }
  }, []);

  return {
    isLoading,
    error,
    mutate,
  };
}
