import type { Industry } from "@/lib/types";
import { useCallback, useState } from "react";
import { industryService } from "@/services/admin/industries/industryService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (industry: Industry) => Promise<boolean>;
}

export function useDeleteIndustry(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(async (industry: Industry): Promise<boolean> => {
    setIsLoading(() => true);
    setError(() => "");

    try {
      await industryService.deleteIndustry(industry.id);
      showToast.success("Industry deleted successfully!");
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete industry";
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
