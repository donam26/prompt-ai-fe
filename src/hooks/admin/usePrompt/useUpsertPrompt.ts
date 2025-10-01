import { useCallback, useState } from "react";
import { promptService } from "@/services/admin/prompts/promptService";

export interface UpsertPromptData {
  title?: string;
  content?: string;
  shortDescription?: string;
  categoryId?: string | number;
  topicId?: string | number;
  industryId?: string | number;
  isType?: string | number;
  subType?: number;
  what?: string;
  tips?: string;
  text?: string;
  how?: string;
  input?: string;
  output?: string;
  optimizationGuide?: string;
  addTip?: string;
  addInformation?: string;
  image?: string;
  imageCard?: string;
  isComingSoon?: boolean;
  tags?: string[];
  industryIds?: (string | number)[];
}

interface IResponse {
  isUpserting: boolean;
  error: string;
  mutate: (data: UpsertPromptData, id?: string) => Promise<boolean>;
}

export function useUpsertPrompt(): IResponse {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: UpsertPromptData, id?: string): Promise<boolean> => {
      setIsUpserting(() => true);
      setError(() => "");

      try {
        if (id) {
          // Update existing prompt
          await promptService.updatePrompt(id, {
            ...data,
            categoryId: data.categoryId?.toString() || "",
            topicId: data.topicId?.toString() || "",
            industryId: data.industryId?.toString() || "",
            isType: data.isType?.toString() || "1",
          });
        } else {
          // Create new prompt
          await promptService.createPrompt({
            ...data,
            categoryId: data.categoryId?.toString() || "",
            topicId: data.topicId?.toString() || "",
            industryId: data.industryId?.toString() || "",
            isType: data.isType?.toString() || "1",
          });
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
