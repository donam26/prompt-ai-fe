"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { BlogCategoryHeaderProps } from "@/types/admin/blog-category";

export const BlogCategoryHeader = ({
  onAddBlogCategory,
  className = "",
}: BlogCategoryHeaderProps): React.JSX.Element => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div>
        <h1 className="font-bold text-gray-900 text-2xl">
          Quản lý Blog Category
        </h1>
        <p className="mt-1 text-gray-600">
          Quản lý danh sách các blog category trong hệ thống
        </p>
      </div>
      <Button onClick={onAddBlogCategory} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Thêm Blog Category
      </Button>
    </div>
  );
};
