import type { User } from "@/types";
import { useCallback, useState } from "react";
import { userService } from "@/services/admin/users/userService";

interface IResponse {
  isUpserting: boolean;
  error: string;
  mutate: (data: Partial<User>, id?: string | number) => Promise<boolean>;
}

export function useUpsertUser(): IResponse {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: Partial<User>, id?: string | number): Promise<boolean> => {
      setIsUpserting(() => true);
      setError(() => "");

      try {
        if (id) {
          await userService.updateUser(id, data);
        } else {
          await userService.createUser(data);
        }
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(() => errorMessage);
        return false;
      } finally {
        setIsUpserting(() => false);
      }
    },
    []
  );

  return {
    isUpserting,
    error,
    mutate,
  };
}
