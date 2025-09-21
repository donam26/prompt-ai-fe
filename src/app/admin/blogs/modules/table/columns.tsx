import React from "react";
import { FileText } from "lucide-react";

import { Column } from "@/components/data-table/data-table";
import {
  ImageCell,
  StatusCell,
  BadgeCell,
  ActionsCell,
} from "@/components/table-cell";
import type { Blog } from "@/lib/types";
import type { BlogColumnHandlers } from "@/types/admin";

/**
 * Base blog columns configuration with responsive widths
 */
export const blogColumns: Column<Blog>[] = [
  {
    key: "featuredImage",
    title: "Hình ảnh",
    width: 120,
    align: "center",
    className: "hidden sm:table-cell",
    render: (_, blog) => (
      <ImageCell
        src={blog.featuredImage || blog.image}
        alt={blog.title}
        size="md"
      />
    ),
  },
  {
    key: "title",
    title: "Tiêu đề",
    dataIndex: "title",
    className: "font-semibold text-gray-900 min-w-[200px] max-w-[300px]",
    render: (_, blog) => (
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <span
            className="font-semibold text-gray-900 truncate"
            title={blog.title}
          >
            {blog.title}
          </span>
          {blog.isFeatured && <BadgeCell label="Nổi bật" variant="premium" />}
        </div>
        {blog.excerpt && (
          <span
            className="max-w-[280px] text-gray-500 text-sm truncate"
            title={blog.excerpt}
          >
            {blog.excerpt}
          </span>
        )}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <BadgeCell
                key={index}
                label={typeof tag === "string" ? tag : tag.name || tag}
                variant="secondary"
                maxWidth="max-w-[80px]"
              />
            ))}
            {blog.tags.length > 3 && (
              <span className="text-gray-400 text-xs">
                +{blog.tags.length - 3} khác
              </span>
            )}
          </div>
        )}
      </div>
    ),
  },
  {
    key: "category",
    title: "Danh mục",
    width: 140,
    className: "hidden md:table-cell",
    render: (_, blog) => (
      <BadgeCell
        label={blog.category || "Chưa phân loại"}
        variant="section"
        maxWidth="max-w-[100px]"
      />
    ),
  },
  {
    key: "status",
    title: "Trạng thái",
    width: 120,
    align: "center",
    className: "min-w-[100px]",
    render: (_, blog) => (
      <StatusCell
        isActive={blog.status === "published"}
        isComingSoon={blog.status === "draft"}
      />
    ),
  },
  {
    key: "author",
    title: "Tác giả",
    width: 140,
    className: "hidden lg:table-cell",
    render: (_, blog) => (
      <span className="text-gray-600 text-sm">
        {blog.author?.name || blog.authorName || "N/A"}
      </span>
    ),
  },
  {
    key: "createdAt",
    title: "Ngày tạo",
    width: 140,
    className: "hidden lg:table-cell",
    render: (_, blog) => (
      <span className="text-gray-600 text-sm">
        {blog.createdAt
          ? new Date(blog.createdAt).toLocaleDateString("vi-VN")
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
          onView={handlers.onView}
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
