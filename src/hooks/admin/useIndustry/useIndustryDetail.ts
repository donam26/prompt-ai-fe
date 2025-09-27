import { useCallback, useEffect, useState } from "react";
import { industryService } from "@/services/admin/industries/industryService";
import type { Industry } from "@/lib/types";

interface IResponse {
  industry: Industry | null;
  isLoading: boolean;
  error: string;
  fetchIndustryDetail: (id: string | number) => Promise<void>;
}

export function useIndustryDetail(id?: string | number): IResponse {
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchIndustryDetail = useCallback(
    async (industryId: string | number) => {
      setIsLoading(true);
      setError("");

      try {
        const response = await industryService.getIndustryById(industryId);
        setIndustry(response.data || null);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(errorMessage);
        setIndustry(null);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (id) {
      fetchIndustryDetail(id);
    }
  }, [id, fetchIndustryDetail]);

  return {
    industry,
    isLoading,
    error,
    fetchIndustryDetail,
  };
}
