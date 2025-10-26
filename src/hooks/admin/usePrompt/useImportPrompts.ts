import { useCallback, useState } from "react";
import { promptService } from "@/services/admin/prompts/promptService";
import { showToast } from "@/components/ui/toast";

interface ImportResult {
  readonly totalProcessed: number;
  readonly successCount: number;
  readonly errorCount: number;
  readonly errors: Array<{
    readonly row: number;
    readonly error: string;
    readonly data: Record<string, unknown>;
  }>;
}

interface IResponse {
  isImporting: boolean;
  error: string;
  importResult: ImportResult | null;
  mutate: (file: File) => Promise<boolean>;
  resetImportResult: () => void;
}

export function useImportPrompts(): IResponse {
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState<string>("");
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  const mutate = useCallback(async (file: File): Promise<boolean> => {
    setIsImporting(() => true);
    setError(() => "");

    try {
      const result = await promptService.importPromptsFromExcel(file);
      setImportResult(() => result.data);

      const { successCount, errorCount, totalProcessed } = result.data;

      if (errorCount === 0) {
        showToast.success(
          `Import thành công! Đã import ${successCount}/${totalProcessed} prompt.`
        );
      } else {
        showToast.warning(
          `Import hoàn thành với ${errorCount} lỗi. Thành công: ${successCount}/${totalProcessed} prompt.`
        );
      }

      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Import thất bại. Vui lòng thử lại.";
      setError(() => errorMessage);
      showToast.error(errorMessage);
      return false;
    } finally {
      setIsImporting(() => false);
    }
  }, []);

  const resetImportResult = useCallback((): void => {
    setImportResult(() => null);
  }, []);

  return {
    isImporting,
    error,
    importResult,
    mutate,
    resetImportResult,
  };
}
