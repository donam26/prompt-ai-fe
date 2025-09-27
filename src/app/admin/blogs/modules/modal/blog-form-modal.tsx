"use client";

import React from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BaseSelect } from "@/components/ui/base-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { BlogFormData } from "@/types/admin";

/**
 * Blog form modal component
 *
 * @param props - The component props
 * @returns The blog form modal JSX
 */
export const BlogFormModal = ({
  isOpen,
  onOpenChange,
  editingBlog,
  formData,
  onFormDataChange,
  onSubmit,
  onReset,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingBlog: any;
  formData: BlogFormData;
  onFormDataChange: (data: BlogFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}): React.JSX.Element => {
  const handleFormDataChange = (
    field: keyof BlogFormData,
    value: string | string[]
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
              {editingBlog ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
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
          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="font-medium">
                Tiêu đề *
              </Label>
              <Input
                id="title"
                type="text"
                value={formData.title}
                onChange={e => handleFormDataChange("title", e.target.value)}
                placeholder="Nhập tiêu đề bài viết"
                required
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt" className="font-medium">
                Tóm tắt *
              </Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={e => handleFormDataChange("excerpt", e.target.value)}
                placeholder="Nhập tóm tắt bài viết"
                rows={3}
                required
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
                onChange={e => handleFormDataChange("content", e.target.value)}
                placeholder="Nhập nội dung bài viết"
                rows={8}
                required
              />
            </div>

            {/* Status and Category */}
            <div className="gap-4 grid grid-cols-2">
              <div className="space-y-2">
                <Label className="font-medium">Trạng thái *</Label>
                <StatusSelect
                  value={formData.status}
                  onChange={value => handleFormDataChange("status", value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Danh mục *</Label>
                <CategorySelect
                  value={formData.category}
                  onChange={value => handleFormDataChange("category", value)}
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label htmlFor="featuredImage" className="font-medium">
                URL hình ảnh nổi bật
              </Label>
              <Input
                id="featuredImage"
                type="url"
                value={formData.featuredImage || ""}
                onChange={e =>
                  handleFormDataChange("featuredImage", e.target.value)
                }
                placeholder="Nhập URL hình ảnh"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={handleClose}>
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white"
            >
              {editingBlog ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

/**
 * Status select component
 */
const StatusSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element => {
  const statusOptions = [
    { id: "draft", name: "Bản nháp" },
    { id: "published", name: "Đã xuất bản" },
    { id: "archived", name: "Đã lưu trữ" },
  ];

  return (
    <BaseSelect
      items={statusOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Chọn trạng thái..."
      className="w-full"
    />
  );
};

/**
 * Category select component
 */
const CategorySelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element => {
  const categoryOptions = [
    { id: "technology", name: "Công nghệ" },
    { id: "business", name: "Kinh doanh" },
    { id: "lifestyle", name: "Lối sống" },
    { id: "education", name: "Giáo dục" },
  ];

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
