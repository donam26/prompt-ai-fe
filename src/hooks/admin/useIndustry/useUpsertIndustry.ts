import type { Industry } from "@/lib/types";
import { useCallback, useState } from "react";
import { industryService } from "@/services/admin/industries/industryService";

interface IResponse {
  isUpserting: boolean;
  error: string;
  mutate: (data: Partial<Industry>, id?: string | number) => Promise<boolean>;
}

export function useUpsertIndustry(): IResponse {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: Partial<Industry>, id?: string | number): Promise<boolean> => {
      setIsUpserting(() => true);
      setError(() => "");

      try {
        if (id) {
          await industryService.updateIndustry(id, data);
        } else {
          await industryService.createIndustry(data);
        }
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(() => errorMessage);
        return false;
      } finally {
        setIsUpserting(() => false);
      }
    },
    []
  );

  return {
    isUpserting,
    error,
    mutate,
  };
}
