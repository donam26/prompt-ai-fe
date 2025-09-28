"use client";

import type { Prompt } from "@/lib/types";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { usePromptDetail, useUpsertPrompt } from "@/hooks/admin/usePrompt";
import { FormSkeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/toast";
import { PROMPTS_CONSTANTS } from "@/constants/prompts";
import { FormMode } from "@/constants/common.constants";
import { PromptForm } from "./modules/prompt-form";

export default function PromptDetailsPage() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

  const formMode = id === "create" ? FormMode.CREATE : FormMode.EDIT;
  const isCreateMode = formMode === FormMode.CREATE;
  const promptIdToUpdate = isCreateMode ? undefined : id;

  const {
    prompt: promptData,
    isLoading,
    error: promptDetailError,
  } = usePromptDetail({ promptId: promptIdToUpdate });
  const {
    mutate: upsertPrompt,
    isUpserting,
    error: upsertPromptError,
  } = useUpsertPrompt();

  const handleSave = useCallback(
    async (data: Partial<Prompt>) => {
      const result = await upsertPrompt(
        {
          ...data,
          what: data.what || "",
          tips: data.tips || "",
          text: data.text || "",
          how: data.how || "",
          input: data.input || "",
          output: data.output || "",
          OptimationGuide: data.OptimationGuide || "",
          addtip: data.addtip || "",
          addinformation: data.addinformation || "",
        },
        promptIdToUpdate
      );

      if (result) {
        showToast.success(
          promptIdToUpdate
            ? "Prompt updated successfully"
            : "Prompt created successfully"
        );
        router.push(PROMPTS_CONSTANTS.ROUTES.PROMPTS);
      }
    },
    [promptIdToUpdate, upsertPrompt, router]
  );

  const handleCancel = useCallback(() => {
    router.push(PROMPTS_CONSTANTS.ROUTES.PROMPTS);
  }, [router]);

  useEffect(() => {
    const errorMessage = promptDetailError || upsertPromptError;
    if (!errorMessage) {
      return;
    }
    showToast.error(errorMessage);
    if (promptDetailError) {
      router.push(PROMPTS_CONSTANTS.ROUTES.PROMPTS);
    }
  }, [promptDetailError, upsertPromptError, router]);

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (isUpserting) {
    return <FormSkeleton />;
  }

  return (
    <PromptForm
      prompt={promptData}
      mode={formMode}
      onSave={handleSave}
      onCancel={handleCancel}
      isSaving={isUpserting}
      isLoading={isLoading}
    />
  );
}
