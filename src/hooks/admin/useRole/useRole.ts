import { useState, useEffect, useCallback } from "react";
import { roleService } from "@/services/admin/roles/roleService";
import type { Role } from "@/types";

interface UseRoleProps {
  id?: string | number;
  enabled?: boolean;
}

export function useRole({ id, enabled = true }: UseRoleProps) {
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRole = useCallback(async () => {
    if (!id || !enabled) {
      setRole(null);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await roleService.getRoleById(id);
      setRole(response.data || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Có lỗi xảy ra");
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  }, [id, enabled]);

  useEffect(() => {
    fetchRole();
  }, [fetchRole]);

  const refetch = useCallback(() => {
    fetchRole();
  }, [fetchRole]);

  return {
    role,
    isLoading,
    error,
    refetch,
  };
}
