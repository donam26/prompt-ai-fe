import { useCallback, useState } from "react";
import { promptService } from "@/services/admin/prompts/promptService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (promptIds: number[]) => Promise<boolean>;
}

export function useBulkDeletePrompts(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(async (promptIds: number[]): Promise<boolean> => {
    if (!promptIds.length) {
      showToast.warning("Vui lòng chọn ít nhất một prompt để xóa.");
      return false;
    }

    setIsLoading(true);
    setError("");

    try {
      await promptService.bulkDeletePrompts(promptIds);
      showToast.success("Đã xóa các prompt đã chọn thành công!");
      return true;
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Không thể xóa các prompt đã chọn.";
      setError(errorMessage);
      showToast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    mutate,
  };
}
