"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { BlogCategoryHeaderProps } from "@/types/admin/blog-category";

export const BlogCategoryHeader = ({
  onAddBlogCategory,
  className = "",
}: BlogCategoryHeaderProps): React.JSX.Element => {
  return (
    <div
      className={`flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4 ${className}`}
    >
      <div className="sm:text-left text-center">
        <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl">
          Quản lý Blog Category
        </h1>
        <p className="mt-1 sm:mt-2 text-gray-600">
          Quản lý danh sách các blog category trong hệ thống
        </p>
      </div>
      <Button
        onClick={onAddBlogCategory}
        className="flex justify-center items-center gap-2 w-full sm:w-auto"
      >
        <Plus className="w-4 h-4" />
        Thêm Blog Category
      </Button>
    </div>
  );
};
