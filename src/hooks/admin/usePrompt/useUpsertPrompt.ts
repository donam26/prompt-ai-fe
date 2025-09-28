import { useCallback, useState } from "react";
import { promptService } from "@/services/admin/prompts/promptService";

export interface UpsertPromptData {
  title?: string;
  content?: string;
  short_description?: string;
  category_id?: string | number;
  topic_id?: string | number;
  industry_id?: string | number;
  is_type?: number;
  sub_type?: number;
  what?: string;
  tips?: string;
  text?: string;
  how?: string;
  input?: string;
  output?: string;
  OptimationGuide?: string;
  addtip?: string;
  addinformation?: string;
  image?: string;
  image_card?: string;
  is_coming_soon?: boolean;
  tags?: string[];
  industry_ids?: (string | number)[];
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
            category_id: data.category_id?.toString() || "",
            topic_id: data.topic_id?.toString() || "",
            industry_id: data.industry_id?.toString() || "",
          });
        } else {
          // Create new prompt
          await promptService.createPrompt({
            ...data,
            category_id: data.category_id?.toString() || "",
            topic_id: data.topic_id?.toString() || "",
            industry_id: data.industry_id?.toString() || "",
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
