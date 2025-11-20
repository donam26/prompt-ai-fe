import { useCallback, useState } from "react";
import { roleService } from "@/services/admin/roles/roleService";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (
    roleId: string | number,
    userId: string | number
  ) => Promise<boolean>;
}

export function useRemoveUserFromRole(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (
      roleId: string | number,
      userId: string | number
    ): Promise<boolean> => {
      setIsLoading(() => true);
      setError(() => "");

      try {
        await roleService.removeUserFromRole(roleId, userId);
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(() => errorMessage);
        return false;
      } finally {
        setIsLoading(() => false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    mutate,
  };
}
