import { useCallback, useState } from "react";
import { userService } from "@/services/admin/users/userService";
import { showToast } from "@/components/ui/toast";

interface UseExportExpiringSubscriptionsResult {
  mutate: (filters: {
    search?: string;
    days?: number;
    subscriptionType?: number;
  }) => Promise<boolean>;
  isLoading: boolean;
}

export const useExportExpiringSubscriptions =
  (): UseExportExpiringSubscriptionsResult => {
    const [isLoading, setIsLoading] = useState(false);

    const mutate = useCallback(
      async (filters: {
        search?: string;
        days?: number;
        subscriptionType?: number;
      }): Promise<boolean> => {
        setIsLoading(true);
        try {
          const result = await userService.exportExpiringSubscriptions(filters);
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
          showToast.error(errorMessage);
          return false;
        } finally {
          setIsLoading(false);
        }
      },
      []
    );

    return {
      mutate,
      isLoading,
    };
  };
