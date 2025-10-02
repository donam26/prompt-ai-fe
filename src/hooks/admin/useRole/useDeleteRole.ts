import type { Role } from "@/types";
import { useCallback, useState } from "react";
import { roleService } from "@/services/admin/roles/roleService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (role: Role) => Promise<boolean>;
}

export function useDeleteRole(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(async (role: Role): Promise<boolean> => {
    setIsLoading(() => true);
    setError(() => "");

    try {
      await roleService.deleteRole(role.id);
      showToast.success("Vai trò đã được xóa thành công!");
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete role";
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
