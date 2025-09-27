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
  control: Control<CategoryFormValues>;
  isDisabled: boolean;
  industries?: Array<{
    id: string | number;
    name: string;
    description?: string;
  }>;
}

// Get options from constants
const { SECTION_OPTIONS, TYPE_OPTIONS } = CATEGORY_CONSTANTS.FORM_OPTIONS;

export function CategoryBasicFields({
  control,
  isDisabled,
  industries = [],
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
          name="section_id"
          render={({
            field,
          }: {
            field: ControllerRenderProps<CategoryFormValues, "section_id">;
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
        name="industry_ids"
        render={({
          field,
        }: {
          field: ControllerRenderProps<CategoryFormValues, "industry_ids">;
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
