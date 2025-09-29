import type { Section } from "@/types";
import { useCallback, useState } from "react";
import { sectionService } from "@/services";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (section: Section) => Promise<boolean>;
}

export function useDeleteSection(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(async (section: Section): Promise<boolean> => {
    setIsLoading(() => true);
    setError(() => "");

    try {
      await sectionService.deleteSection(section.id);
      showToast.success("Section deleted successfully!");
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete section";
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
