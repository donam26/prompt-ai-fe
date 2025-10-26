import { useState, useCallback } from "react";
import { promptService } from "@/services/admin/prompts/promptService";
import { showToast } from "@/components/ui/toast";

interface UseBulkUpdateSubTypeResult {
  updateSubType: (promptIds: number[], subType: number) => Promise<boolean>;
  isUpdating: boolean;
  error: string | null;
}

export const useBulkUpdateSubType = (): UseBulkUpdateSubTypeResult => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSubType = useCallback(
    async (promptIds: number[], subType: number): Promise<boolean> => {
      setIsUpdating(true);
      setError(null);

      try {
        const result = await promptService.bulkUpdateSubType(
          promptIds,
          subType
        );

        if (result.success) {
          const typeLabel = subType === 1 ? "Free" : "Premium";
          showToast.success(
            `Đã cập nhật ${promptIds.length} prompt thành ${typeLabel}`
          );
          return true;
        } else {
          const errorMessage = result.message || "Có lỗi xảy ra khi cập nhật";
          setError(errorMessage);
          showToast.error(errorMessage);
          return false;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Có lỗi xảy ra";
        setError(errorMessage);
        showToast.error(errorMessage);
        return false;
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  return { updateSubType, isUpdating, error };
};
