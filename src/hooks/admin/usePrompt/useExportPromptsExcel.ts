import { useCallback, useState } from "react";
import { PromptFilterState } from "@/types";
import { promptService } from "@/services/admin/prompts/promptService";
import { applyNonEmptyFiltersToQuery } from "@/utils";

interface IResponse {
  isExporting: boolean;
  error: string | null;
  exportPromptsExcel: () => Promise<void>;
  mutate: () => Promise<void>;
}

export function useExportPromptsExcel(filters: PromptFilterState): IResponse {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportPromptsExcel = useCallback(async () => {
    setIsExporting(true);
    setError(null);

    try {
      // Transform filters to match service expectations
      const exportFilters: Record<string, unknown> = {
        search: filters.searchTerm,
        categoryIds: filters.categoryIds,
        industryIds: filters.industryIds,
        isType: filters.isType,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
      };
      applyNonEmptyFiltersToQuery(exportFilters, exportFilters);
      // Call the service method
      await promptService.exportPromptsExcel(exportFilters);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to export prompts";
      setError(errorMessage);
      console.error("Export error:", err);
      throw err;
    } finally {
      setIsExporting(false);
    }
  }, [filters]);

  return {
    isExporting,
    error,
    exportPromptsExcel,
    mutate: exportPromptsExcel,
  };
}
