import { useCallback, useState } from "react";
import { roleService } from "@/services/admin/roles/roleService";
import type { RoleFormData } from "@/types/admin/role";

interface UseUpdateRoleParams {
  readonly id: string | number;
}

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (data: RoleFormData) => Promise<boolean>;
}

export function useUpdateRole({ id }: UseUpdateRoleParams): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: RoleFormData): Promise<boolean> => {
      setIsLoading(() => true);
      setError(() => "");

      try {
        const roleData = {
          name: data.name,
          description: data.description,
          permissions: data.permissions,
        };

        await roleService.updateRole(id, roleData);
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
    [id]
  );

  return {
    isLoading,
    error,
    mutate,
  };
}
