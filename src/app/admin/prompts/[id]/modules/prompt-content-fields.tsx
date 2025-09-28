"use client";

import type { Control, ControllerRenderProps } from "react-hook-form";
import type { PromptFormValues } from "@/libs/form-schemas";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  control: Control<PromptFormValues>;
  isDisabled: boolean;
}

export function PromptContentFields({ control, isDisabled }: Props) {
  return (
    <div className="space-y-6 mb-4">
      {/* Content - Main prompt content */}
      <FormField
        control={control}
        name="content"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "content">;
        }) => (
          <FormItem>
            <FormLabel>Content</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter prompt content"
                rows={6}
                disabled={isDisabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* What - What the prompt does */}
      <FormField
        control={control}
        name="what"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "what">;
        }) => (
          <FormItem>
            <FormLabel>What</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe what this prompt does"
                rows={4}
                disabled={isDisabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* How - How to use the prompt */}
      <FormField
        control={control}
        name="how"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "how">;
        }) => (
          <FormItem>
            <FormLabel>How</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe how to use this prompt"
                rows={4}
                disabled={isDisabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Tips - Usage tips */}
      <FormField
        control={control}
        name="tips"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "tips">;
        }) => (
          <FormItem>
            <FormLabel>Tips</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter usage tips"
                rows={4}
                disabled={isDisabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
