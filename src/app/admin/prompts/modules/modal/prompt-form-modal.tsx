"use client";

import React from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BaseSelect } from "@/components/ui/base-select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PromptFormData } from "@/types/admin";

export const PromptFormModal = ({
  isOpen,
  onOpenChange,
  editingPrompt,
  formData,
  onFormDataChange,
  onSubmit,
  categories,
  onReset,
}: any): React.JSX.Element => {
  const handleFormDataChange = (
    field: keyof PromptFormData,
    value: string | boolean | string[]
  ): void => {
    onFormDataChange({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleClose = (): void => {
    onReset();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>
              {editingPrompt ? "Chỉnh sửa prompt" : "Thêm prompt mới"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="p-0 w-8 h-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <PromptFormFields
            formData={formData}
            onFormDataChange={handleFormDataChange}
            categories={categories}
          />

          <PromptFormActions
            onReset={handleClose}
            editingPrompt={editingPrompt}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Prompt form fields component
 *
 * @param props - The component props
 * @returns The prompt form fields JSX
 */
const PromptFormFields = ({
  formData,
  onFormDataChange,
  categories,
}: {
  formData: PromptFormData;
  onFormDataChange: (
    field: keyof PromptFormData,
    value: string | boolean | string[]
  ) => void;
  categories: any[];
}): React.JSX.Element => (
  <div className="space-y-4">
    {/* Title and Category */}
    <div className="gap-4 grid grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="title" className="font-medium">
          Tiêu đề *
        </Label>
        <Input
          id="title"
          type="text"
          value={formData.title}
          onChange={e => onFormDataChange("title", e.target.value)}
          placeholder="Nhập tiêu đề prompt"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="font-medium">Danh mục *</Label>
        <CategorySelect
          value={formData.categoryId}
          categories={categories}
          onChange={value => onFormDataChange("categoryId", value)}
        />
      </div>
    </div>

    {/* Description */}
    <div className="space-y-2">
      <Label htmlFor="description" className="font-medium">
        Mô tả
      </Label>
      <Textarea
        id="description"
        value={formData.description || ""}
        onChange={e => onFormDataChange("description", e.target.value)}
        placeholder="Nhập mô tả prompt"
        rows={3}
      />
    </div>

    {/* Content */}
    <div className="space-y-2">
      <Label htmlFor="content" className="font-medium">
        Nội dung *
      </Label>
      <Textarea
        id="content"
        value={formData.content}
        onChange={e => onFormDataChange("content", e.target.value)}
        placeholder="Nhập nội dung prompt"
        rows={6}
        required
      />
    </div>

    {/* Tags */}
    <div className="space-y-2">
      <Label className="font-medium">Tags</Label>
      <TagsSelect
        value={formData.tags}
        onChange={values => onFormDataChange("tags", values)}
      />
    </div>

    {/* Image URL */}
    <div className="space-y-2">
      <Label htmlFor="image" className="font-medium">
        URL hình ảnh
      </Label>
      <Input
        id="image"
        type="url"
        value={formData.image || ""}
        onChange={e => onFormDataChange("image", e.target.value)}
        placeholder="Nhập URL hình ảnh"
      />
    </div>

    {/* Settings */}
    <div className="gap-4 grid grid-cols-2">
      <div className="flex items-center space-x-2">
        <Switch
          id="isPublic"
          checked={formData.isPublic}
          onCheckedChange={checked => onFormDataChange("isPublic", checked)}
        />
        <Label htmlFor="isPublic">Công khai</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isPremium"
          checked={formData.isPremium}
          onCheckedChange={checked => onFormDataChange("isPremium", checked)}
        />
        <Label htmlFor="isPremium">Premium</Label>
      </div>
    </div>
  </div>
);

/**
 * Category select component
 *
 * @param props - The component props
 * @returns The category select JSX
 */
const CategorySelect = ({
  value,
  categories,
  onChange,
}: {
  value: string;
  categories: any[];
  onChange: (value: string) => void;
}): React.JSX.Element => {
  const categoryOptions = categories.map(category => ({
    id: category.id.toString(),
    name: category.name,
  }));

  return (
    <BaseSelect
      items={categoryOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Chọn danh mục..."
      className="w-full"
    />
  );
};

/**
 * Tags select component
 *
 * @param props - The component props
 * @returns The tags select JSX
 */
const TagsSelect = ({
  value,
  onChange,
}: {
  value: string[];
  onChange: (values: string[]) => void;
}): React.JSX.Element => {
  // Mock tags data - in real app, this would come from API
  const tagOptions = [
    { value: "ai", label: "AI" },
    { value: "writing", label: "Writing" },
    { value: "coding", label: "Coding" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "business", label: "Business" },
  ];

  return (
    <MultiSelect
      options={tagOptions}
      defaultValue={value}
      onValueChange={onChange}
      placeholder="Chọn tags..."
      maxCount={5}
      className="w-full"
    />
  );
};

/**
 * Prompt form actions component
 *
 * @param props - The component props
 * @returns The prompt form actions JSX
 */
const PromptFormActions = ({
  onReset,
  editingPrompt,
}: {
  onReset: () => void;
  editingPrompt: any;
}): React.JSX.Element => (
  <div className="flex justify-end gap-3 pt-4 border-t">
    <Button type="button" variant="outline" onClick={onReset}>
      Hủy
    </Button>
    <Button
      type="submit"
      className="bg-primary-600 hover:bg-primary-700 text-white"
    >
      {editingPrompt ? "Cập nhật" : "Tạo mới"}
    </Button>
  </div>
);
