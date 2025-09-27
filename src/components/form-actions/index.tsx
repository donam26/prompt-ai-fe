"use client";

import { Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onCancelAction: () => void;
  isSaving: boolean;
  isDisabled: boolean;
  cancelText: string;
  saveText: string;
  formId: string;
}

export function FormActions({
  onCancelAction,
  isSaving,
  isDisabled,
  cancelText,
  saveText,
  formId,
}: Props) {
  return (
    <div className="flex flex-row justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={onCancelAction}
        disabled={isSaving}
        className="flex items-center gap-2 bg-transparent w-auto sm:w-full lg:w-auto h-10"
      >
        <X className="w-4 h-4" />
        {cancelText}
      </Button>
      <Button
        type="submit"
        form={formId}
        disabled={isDisabled}
        className="flex items-center gap-2 w-auto sm:w-full lg:w-auto h-10"
      >
        <Save className="flex-shrink-0 w-4 h-4" />
        {saveText}
      </Button>
    </div>
  );
}
