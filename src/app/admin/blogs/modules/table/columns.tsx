import React from "react";
import { FileText } from "lucide-react";

import { Column } from "@/components/data-table/data-table";
import { ImageCell, BadgeCell, ActionsCell } from "@/components/table-cell";
import { BLOG_CONSTANTS } from "@/constants/blog";
import type { BlogColumnHandlers } from "@/types/admin/blog";
import type { Blog } from "@/lib/types";

/**
 * Base blog columns configuration with responsive widths
 */
export const blogColumns: Column<Blog>[] = [
  {
    key: "id",
    title: "ID",
    width: 80,
    align: "center",
    className: "min-w-[60px]",
    render: (_, blog) => (
      <span className="font-mono text-gray-600 text-sm">#{blog.id}</span>
    ),
  },
  {
    key: "title",
    title: "Tiêu đề Blog",
    dataIndex: "title",
    className: "font-semibold text-gray-900 min-w-[200px] max-w-[300px]",
    render: (_, blog) => (
      <div className="flex flex-col space-y-1">
        <span
          className="font-semibold text-gray-900 truncate"
          title={blog.title}
        >
          {blog.title}
        </span>
        {blog.meta_description && (
          <span
            className="text-gray-500 text-xs truncate"
            title={blog.meta_description}
          >
            {blog.meta_description}
          </span>
        )}
      </div>
    ),
  },
  {
    key: "featuredImage",
    title: "Hình ảnh",
    width: 80,
    align: "center",
    className: "hidden md:table-cell",
    render: (_, blog) => (
      <div className="flex justify-center items-center">
        {blog.featured_image ? (
          <ImageCell
            src={blog.featured_image}
            alt={blog.title}
            size="sm"
            className="rounded-md"
          />
        ) : (
          <FileText className="w-6 h-6 text-gray-400" />
        )}
      </div>
    ),
  },
  {
    key: "category",
    title: "Danh mục",
    width: 120,
    className: "hidden lg:table-cell",
    render: (_, blog) => {
      const categoryName =
        blog.category?.name || blog.blog_category?.name || "N/A";

      // Dynamic variant based on category name
      const getCategoryVariant = (
        name: string
      ): "ai" | "tech" | "business" | "secondary" => {
        const lowerName = name.toLowerCase();
        if (
          lowerName.includes(BLOG_CONSTANTS.CATEGORY.AI.toLowerCase()) ||
          lowerName.includes("artificial")
        )
          return "ai";
        if (lowerName.includes("tech") || lowerName.includes("technology"))
          return "tech";
        if (
          lowerName.includes(BLOG_CONSTANTS.CATEGORY.BUSINESS.toLowerCase()) ||
          lowerName.includes(BLOG_CONSTANTS.CATEGORY.MARKETING.toLowerCase())
        )
          return "business";
        return "secondary";
      };

      return (
        <BadgeCell
          value={categoryName}
          variant={getCategoryVariant(categoryName)}
          className="text-xs"
        />
      );
    },
  },
  {
    key: "publishedAt",
    title: "Ngày xuất bản",
    width: 140,
    className: "hidden xl:table-cell",
    render: (_, blog) => (
      <span className="text-gray-600 text-sm">
        {blog.published_at
          ? new Date(blog.published_at).toLocaleDateString("vi-VN")
          : "Chưa xuất bản"}
      </span>
    ),
  },
  {
    key: "createdAt",
    title: "Ngày tạo",
    width: 140,
    className: "hidden md:table-cell",
    render: (_, blog) => (
      <span className="text-gray-600 text-sm">
        {blog.created_at
          ? new Date(blog.created_at).toLocaleDateString("vi-VN")
          : "N/A"}
      </span>
    ),
  },
  {
    key: "updatedAt",
    title: "Cập nhật cuối",
    width: 140,
    className: "hidden lg:table-cell",
    render: (_, blog) => (
      <span className="text-gray-600 text-sm">
        {blog.updated_at
          ? new Date(blog.updated_at).toLocaleDateString("vi-VN")
          : "N/A"}
      </span>
    ),
  },
  {
    key: "actions",
    title: "Thao tác",
    width: 140,
    align: "center",
    className: "min-w-[120px]",
    render: (_, blog, index, context) => {
      const handlers = (context as BlogColumnHandlers) || {};
      return (
        <ActionsCell
          item={blog}
          onEdit={handlers.onEdit}
          onDelete={item => handlers.onDelete?.(item.id)}
        />
      );
    },
  },
];

/**
 * Creates blog columns with custom handlers
 *
 * @param handlers - The column handlers
 * @returns The configured blog columns
 */
export const createBlogColumns = (
  handlers: BlogColumnHandlers
): Column<Blog>[] => {
  return blogColumns.map(column => {
    if (column.key === "actions") {
      return {
        ...column,
        render: (value, blog, index) =>
          column.render?.(value, blog, index, handlers),
      };
    }
    return column;
  });
};
