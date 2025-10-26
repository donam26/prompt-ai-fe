import { useCallback, useState } from "react";
import { PromptFilterState } from "@/types";
import { promptService } from "@/services/admin/prompts/promptService";

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
      // Transform filters to match backend expectations
      const exportFilters: Record<string, unknown> = {};

      // Handle search - support multiple parameter names
      if (filters.searchTerm) {
        exportFilters.search = filters.searchTerm;
      }

      // Handle categoryIds - support array format
      if (filters.categoryIds && filters.categoryIds.length > 0) {
        exportFilters.categoryIds = filters.categoryIds;
      }

      // Handle industryIds - support array format
      if (filters.industryIds && filters.industryIds.length > 0) {
        exportFilters.industryIds = filters.industryIds;
      }

      // Handle isType filtering - support multiple values
      if (filters.isType !== undefined && filters.isType !== null) {
        exportFilters.isType = filters.isType;
      }

      // Handle subType filtering
      if (filters.subType !== undefined && filters.subType !== null) {
        exportFilters.subType = filters.subType;
      }

      // Handle date range
      if (filters.dateFrom) {
        exportFilters.dateFrom = filters.dateFrom;
      }
      if (filters.dateTo) {
        exportFilters.dateTo = filters.dateTo;
      }

      // Call the service method with GET request and query parameters
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
