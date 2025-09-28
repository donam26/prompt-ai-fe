"use client";

import {
  Controller,
  type Control,
  type ControllerRenderProps,
} from "react-hook-form";
import type { PromptFormValues } from "@/libs/form-schemas";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import { FormSwitch } from "@/components/form-switch";

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
              <Textarea
                placeholder="Enter additional text content"
                rows={3}
                disabled={isDisabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Input - Input requirements */}
      <FormField
        control={control}
        name="input"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "input">;
        }) => (
          <FormItem>
            <FormLabel>Input</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe input requirements"
                rows={4}
                disabled={isDisabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Output - Expected output */}
      <FormField
        control={control}
        name="output"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "output">;
        }) => (
          <FormItem>
            <FormLabel>Output</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe expected output"
                rows={4}
                disabled={isDisabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Optimization Guide */}
      <FormField
        control={control}
        name="OptimationGuide"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "OptimationGuide">;
        }) => (
          <FormItem>
            <FormLabel>Optimization Guide</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter optimization guide"
                rows={6}
                disabled={isDisabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Additional Tips */}
      <FormField
        control={control}
        name="addtip"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "addtip">;
        }) => (
          <FormItem>
            <FormLabel>Additional Tips</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter additional tips"
                rows={4}
                disabled={isDisabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Additional Information */}
      <FormField
        control={control}
        name="addinformation"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "addinformation">;
        }) => (
          <FormItem>
            <FormLabel>Additional Information</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter additional information"
                rows={4}
                disabled={isDisabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Coming Soon Switch */}
      <Controller
        name="is_coming_soon"
        control={control}
        render={({ field }) => (
          <FormSwitch
            name="is_coming_soon"
            label="Coming Soon"
            description="Mark this prompt as coming soon"
            checked={field.value || false}
            onCheckedChange={field.onChange}
            isDisabled={isDisabled}
          />
        )}
      />
    </div>
  );
}
