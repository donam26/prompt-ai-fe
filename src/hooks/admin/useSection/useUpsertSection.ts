import type { SectionFormData } from "@/types/admin/section";
import { useCallback, useState } from "react";
import { sectionService } from "@/services/admin/sections/sectionService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isUpserting: boolean;
  error: string;
  mutate: (sectionData: SectionFormData) => Promise<boolean>;
}

export function useUpsertSection(): IResponse {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (sectionData: SectionFormData): Promise<boolean> => {
      setIsUpserting(() => true);
      setError(() => "");

      try {
        if (sectionData.id) {
          // Update existing section
          await sectionService.updateSection(sectionData.id, sectionData);
          showToast.success("Section đã được cập nhật thành công");
        } else {
          // Create new section
          await sectionService.createSection(sectionData);
          showToast.success("Section đã được tạo thành công");
        }
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Có lỗi xảy ra khi xử lý section";
        setError(() => errorMessage);
        showToast.error(errorMessage);
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
