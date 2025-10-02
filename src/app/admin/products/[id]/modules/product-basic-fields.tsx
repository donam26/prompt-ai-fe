"use client";

import type { Section } from "@/types";
import { Controller, Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProductFormData } from "@/libs/form-schemas/product-schema";

interface Props {
  control: Control<ProductFormData>;
  isDisabled?: boolean;
  sections: Section[];
}

export const ProductBasicFields = ({
  control,
  isDisabled = false,
  sections,
}: Props) => {
  return (
    <div className="space-y-4">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="name" className="font-medium text-sm">
          Product Name <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Input
                {...field}
                id="name"
                placeholder="Enter product name"
                disabled={isDisabled}
                className={error ? "border-red-500" : ""}
              />
              {error && (
                <p className="mt-1 text-red-500 text-sm">{error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Link Field */}
      <div className="space-y-2">
        <Label htmlFor="link" className="font-medium text-sm">
          Link <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="link"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Input
                {...field}
                id="link"
                type="url"
                placeholder="https://example.com"
                disabled={isDisabled}
                className={error ? "border-red-500" : ""}
              />
              {error && (
                <p className="mt-1 text-red-500 text-sm">{error.message}</p>
              )}
            </div>
          )}
        />
      </div>

      {/* Section Field */}
      <div className="space-y-2">
        <Label htmlFor="sectionId" className="font-medium text-sm">
          Section <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="sectionId"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <div>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isDisabled}
              >
                <SelectTrigger className={error ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map(section => (
                    <SelectItem key={section.id} value={section.id.toString()}>
                      {section.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {error && (
                <p className="mt-1 text-red-500 text-sm">{error.message}</p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
};
