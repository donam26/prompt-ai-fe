"use client";

import type { Control, ControllerRenderProps } from "react-hook-form";
import type { CategoryFormValues } from "@/libs/form-schemas";
import { CATEGORY_CONSTANTS } from "@/constants/category";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";

interface Props {
  readonly control: Control<CategoryFormValues>;
  readonly isDisabled: boolean;
  readonly industries?: ReadonlyArray<{
    readonly id: string | number;
    readonly name: string;
    readonly description?: string;
  }>;
  readonly industriesLoading?: boolean;
  readonly industriesSearch?: string;
  readonly onIndustriesSearch?: (search: string) => void;
  readonly onIndustriesScrollToBottom?: () => void;
  readonly hasMoreIndustries?: boolean;
}

// Get options from constants
const { SECTION_OPTIONS, TYPE_OPTIONS } = CATEGORY_CONSTANTS.FORM_OPTIONS;

export function CategoryBasicFields({
  control,
  isDisabled,
  industries = [],
  industriesLoading = false,
  industriesSearch = "",
  onIndustriesSearch,
  onIndustriesScrollToBottom,
  hasMoreIndustries = false,
}: Props) {
  return (
    <div className="space-y-6 mb-4">
      {/* First row: Name and Section */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <FormField
          control={control}
          name="name"
          render={({
            field,
          }: {
            field: ControllerRenderProps<CategoryFormValues, "name">;
          }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter category name"
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
          name="sectionId"
          render={({
            field,
          }: {
            field: ControllerRenderProps<CategoryFormValues, "sectionId">;
          }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isDisabled}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a section" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="min-w-[200px]">
                  {SECTION_OPTIONS.map(option => (
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
      </div>

      {/* Second row: Type */}
      <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
        <FormField
          control={control}
          name="type"
          render={({
            field,
          }: {
            field: ControllerRenderProps<CategoryFormValues, "type">;
          }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
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
        name="industryIds"
        render={({
          field,
        }: {
          field: ControllerRenderProps<CategoryFormValues, "industryIds">;
        }) => {
          const selectedValues = field.value || [];

          // Map industries from API to options
          // Selected industries are now preserved in allIndustries from page.tsx
          // so we don't need to merge missing options here
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
                  value={selectedValues}
                  onValueChange={field.onChange}
                  placeholder="Chọn ngành nghề..."
                  maxCount={3}
                  className="w-full"
                  disabled={isDisabled}
                  shouldFilter={false}
                  searchValue={industriesSearch}
                  onSearch={onIndustriesSearch}
                  onScrollToBottom={onIndustriesScrollToBottom}
                  isLoading={industriesLoading}
                  hasMore={hasMoreIndustries}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* Fourth row: Description (full width) */}
      <FormField
        control={control}
        name="description"
        render={({
          field,
        }: {
          field: ControllerRenderProps<CategoryFormValues, "description">;
        }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter category description"
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
