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
  selectedCategoryId?: string;
  onCategoryChange?: (categoryId: string) => void;
}

// Get options from constants
const { TYPE_OPTIONS } = PROMPTS_CONSTANTS.FORM_OPTIONS;

export function PromptBasicFields({
  control,
  isDisabled,
  categories = [],
  industries = [],
  selectedCategoryId,
  onCategoryChange,
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
          name="categoryId"
          render={({
            field,
          }: {
            field: ControllerRenderProps<PromptFormValues, "categoryId">;
          }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={value => {
                  field.onChange(value);
                  onCategoryChange?.(value);
                }}
                defaultValue={field.value}
                value={field.value}
                disabled={isDisabled}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="min-w-[200px] max-h-[300px]">
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
          name="isType"
          render={({
            field,
          }: {
            field: ControllerRenderProps<PromptFormValues, "isType">;
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
                <SelectContent className="min-w-[150px] max-h-[300px]">
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
        name="industryIds"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "industryIds">;
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
                  placeholder={
                    selectedCategoryId
                      ? "Chọn ngành nghề..."
                      : "Vui lòng chọn danh mục trước"
                  }
                  maxCount={3}
                  className="w-full"
                  disabled={isDisabled || !selectedCategoryId}
                />
              </FormControl>
              {!selectedCategoryId && (
                <p className="mt-1 text-gray-500 text-sm">
                  Vui lòng chọn danh mục để xem danh sách ngành nghề
                </p>
              )}
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* Fourth row: Short Description */}
      <FormField
        control={control}
        name="shortDescription"
        render={({
          field,
        }: {
          field: ControllerRenderProps<PromptFormValues, "shortDescription">;
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
