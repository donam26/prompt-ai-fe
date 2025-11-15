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
    <div className="flex flex-row justify-end gap-2 flex-wrap sm:flex-nowrap">
      <Button
        type="button"
        variant="outline"
        onClick={onCancelAction}
        disabled={isSaving}
        className="flex items-center justify-center gap-2 bg-transparent min-w-[100px] sm:min-w-auto h-10"
      >
        <X className="w-4 h-4 flex-shrink-0" />
        <span className="whitespace-nowrap">{cancelText}</span>
      </Button>
      <Button
        type="submit"
        form={formId}
        disabled={isDisabled}
        className="flex items-center justify-center gap-2 min-w-[100px] sm:min-w-auto h-10"
      >
        <Save className="flex-shrink-0 w-4 h-4" />
        <span className="whitespace-nowrap">{saveText}</span>
      </Button>
    </div>
  );
}
