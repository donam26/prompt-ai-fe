import React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Column } from "@/components/data-table/data-table";
import {
  ImageCell,
  StatusCell,
  BadgeCell,
  ActionsCell,
} from "@/components/table-cell";
import { Button } from "@/components/ui/button";
import type { Prompt } from "@/lib/types";
import type { PromptColumnHandlers } from "@/types/admin";

/**
 * Base prompt columns configuration with responsive widths
 */
export const promptColumns: Column<Prompt>[] = [
  {
    key: "image",
    title: "Hình ảnh",
    width: 120,
    align: "center",
    className: "hidden sm:table-cell",
    render: (_, prompt) => (
      <ImageCell src={prompt.image} alt={prompt.title} size="md" />
    ),
  },
  {
    key: "title",
    title: "Tiêu đề",
    dataIndex: "title",
    className: "font-semibold text-gray-900 min-w-[200px] max-w-[300px]",
    render: (_, prompt) => (
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <span
            className="font-semibold text-gray-900 truncate"
            title={prompt.title}
          >
            {prompt.title}
          </span>
          {prompt.isPremium && <BadgeCell label="Premium" variant="premium" />}
        </div>
        {prompt.description && (
          <span
            className="max-w-[280px] text-gray-500 text-sm truncate"
            title={prompt.description}
          >
            {prompt.description}
          </span>
        )}
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {prompt.tags.slice(0, 3).map((tag, index) => (
              <BadgeCell
                key={index}
                label={typeof tag === "string" ? tag : tag.name || tag}
                variant="secondary"
                maxWidth="max-w-[80px]"
              />
            ))}
            {prompt.tags.length > 3 && (
              <span className="text-gray-400 text-xs">
                +{prompt.tags.length - 3} khác
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
    render: (_, prompt) => (
      <BadgeCell
        label={
          prompt.category?.name || prompt.Category?.name || "Chưa phân loại"
        }
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
    render: (_, prompt) => (
      <div className="flex flex-col items-center space-y-1">
        <StatusCell
          isActive={prompt.isActive !== false}
          isComingSoon={prompt.isComingSoon}
        />
        <div className="flex items-center gap-1">
          {prompt.isPublic ? (
            <Eye className="w-3 h-3 text-green-500" />
          ) : (
            <EyeOff className="w-3 h-3 text-gray-400" />
          )}
          <span className="text-xs text-gray-500">
            {prompt.isPublic ? "Công khai" : "Riêng tư"}
          </span>
        </div>
      </div>
    ),
  },
  {
    key: "createdAt",
    title: "Ngày tạo",
    width: 140,
    className: "hidden lg:table-cell",
    render: (_, prompt) => (
      <span className="text-gray-600 text-sm">
        {prompt.createdAt
          ? new Date(prompt.createdAt).toLocaleDateString("vi-VN")
          : "N/A"}
      </span>
    ),
  },
  {
    key: "actions",
    title: "Thao tác",
    width: 160,
    align: "center",
    className: "min-w-[140px]",
    render: (_, prompt, index, context) => {
      const handlers = (context as PromptColumnHandlers) || {};
      return (
        <div className="flex items-center gap-1">
          <ActionsCell
            item={prompt}
            onEdit={handlers.onEdit}
            onDelete={item => handlers.onDelete?.(item.id)}
            onView={handlers.onView}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handlers.onTogglePublic?.(prompt)}
            className="h-8 w-8 p-0"
            title={prompt.isPublic ? "Ẩn khỏi công khai" : "Hiện công khai"}
          >
            {prompt.isPublic ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
        </div>
      );
    },
  },
];

/**
 * Creates prompt columns with custom handlers
 *
 * @param handlers - The column handlers
 * @returns The configured prompt columns
 */
export const createPromptColumns = (
  handlers: PromptColumnHandlers
): Column<Prompt>[] => {
  return promptColumns.map(column => {
    if (column.key === "actions") {
      return {
        ...column,
        render: (value, prompt, index) =>
          column.render?.(value, prompt, index, handlers),
      };
    }
    return column;
  });
};
