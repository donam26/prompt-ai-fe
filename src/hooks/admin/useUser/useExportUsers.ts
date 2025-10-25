import { useCallback, useState } from "react";
import { userService } from "@/services/admin/users/userService";
import { showToast } from "@/components/ui/toast";
import { mapUserFiltersToBackend } from "@/utils/admin/user-filter-mapper";
import type { UserFilterState } from "@/types/admin/user";

interface IResponse {
  isExporting: boolean;
  error: string;
  mutate: (filters: UserFilterState) => Promise<boolean>;
}

export function useExportUsers(): IResponse {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (filters: UserFilterState): Promise<boolean> => {
      setIsExporting(() => true);
      setError(() => "");

      try {
        // Map frontend filters to backend format
        const backendFilters = mapUserFiltersToBackend(filters);
        const result = await userService.exportUsers(backendFilters);

        if (result.success) {
          showToast.success(
            `Export thành công! File ${result.fileName} đã được tải về.`
          );
          return true;
        } else {
          showToast.error("Export thất bại. Vui lòng thử lại.");
          return false;
        }
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Export thất bại. Vui lòng thử lại.";
        setError(() => errorMessage);
        showToast.error(errorMessage);
        return false;
      } finally {
        setIsExporting(() => false);
      }
    },
    []
  );

  return {
    isExporting,
    error,
    mutate,
  };
}
