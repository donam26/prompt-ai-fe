"use client";

import { type Control, type ControllerRenderProps } from "react-hook-form";
import type { PromptFormValues } from "@/libs/form-schemas";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  MarkdownEditor,
  QuillEditor,
  FormMessage,
} from "@/components/ui";

interface Props {
  control: Control<PromptFormValues>;
  isDisabled: boolean;
}

export function PromptAdvancedFields({ control, isDisabled }: Props) {
  return (
    <div className="space-y-6 mb-4">
      {/* Text - Additional text content */}
      <FormField
        control={control}
        name="text"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "text">;
        }) => (
          <FormItem>
            <FormLabel>Text</FormLabel>
            <FormControl>
              <QuillEditor
                value={field.value || ""}
                onChange={field.onChange}
                disabled={isDisabled}
                placeholder="Nhập nội dung text bổ sung"
                minHeight={150}
                showPreview={true}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Optimization Guide */}
      <FormField
        control={control}
        name="optimizationGuide"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "optimizationGuide">;
        }) => (
          <FormItem>
            <FormLabel>Optimization Guide</FormLabel>
            <FormControl>
              <MarkdownEditor
                value={field.value || ""}
                onChange={field.onChange}
                disabled={isDisabled}
                placeholder="Nhập hướng dẫn tối ưu hóa (Markdown)"
                minHeight={200}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
