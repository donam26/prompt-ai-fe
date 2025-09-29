"use client";

import type { Control, ControllerRenderProps } from "react-hook-form";
import type { PromptFormValues } from "@/libs/form-schemas";
import { PROMPTS_CONSTANTS } from "@/constants/prompts";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  QuillEditor,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";

interface Props {
  control: Control<PromptFormValues>;
  isDisabled: boolean;
  categories?: Array<{
    id: string | number;
    name: string;
    description?: string;
  }>;
  industries?: Array<{
    id: string | number;
    name: string;
    description?: string;
  }>;
}

// Get options from constants
const { TYPE_OPTIONS } = PROMPTS_CONSTANTS.FORM_OPTIONS;

export function PromptBasicFields({
  control,
  isDisabled,
  categories = [],
  industries = [],
}: Props) {
  return (
    <div className="space-y-6 mb-4">
      {/* First row: Title and Category */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <FormField
          control={control}
          name="title"
          render={({
            field,
          }: {
            field: ControllerRenderProps<PromptFormValues, "title">;
          }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter prompt title"
                  disabled={isDisabled}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="category_id"
          render={({
            field,
          }: {
            field: ControllerRenderProps<PromptFormValues, "category_id">;
          }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isDisabled}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="min-w-[200px]">
                  {categories.map(category => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Second row: Type */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <FormField
          control={control}
          name="is_type"
          render={({
            field,
          }: {
            field: ControllerRenderProps<PromptFormValues, "is_type">;
          }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString()}
                disabled={isDisabled}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="min-w-[150px]">
                  {TYPE_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Empty div to maintain grid structure */}
        <div></div>
      </div>

      {/* Third row: Industries (full width) */}
      <FormField
        control={control}
        name="industry_ids"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "industry_ids">;
        }) => {
          const options = industries.map(industry => ({
            value: industry.id.toString(),
            label: industry.name,
          }));

          return (
            <FormItem>
              <FormLabel>Industries</FormLabel>
              <FormControl>
                <MultiSelect
                  options={options}
                  defaultValue={field.value || []}
                  onValueChange={field.onChange}
                  placeholder="Chọn ngành nghề..."
                  maxCount={3}
                  className="w-full"
                  disabled={isDisabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* Fourth row: Short Description */}
      <FormField
        control={control}
        name="short_description"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "short_description">;
        }) => (
          <FormItem>
            <FormLabel>Short Description</FormLabel>
            <FormControl>
              <QuillEditor
                value={field.value || ""}
                onChange={field.onChange}
                disabled={isDisabled}
                placeholder="Nhập mô tả ngắn"
                showPreview={true}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
              <QuillEditor
                value={field.value || ""}
                onChange={field.onChange}
                disabled={isDisabled}
                placeholder="Nhập nội dung prompt chính"
                showPreview={true}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
