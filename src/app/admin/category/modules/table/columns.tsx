import React from "react";
// import { Award } from "lucide-react";

import { Column } from "@/components/data-table/data-table";
import {
  ImageCell,
  StatusCell,
  BadgeCell,
  IndustryTagsCell,
  ActionsCell,
} from "@/components/table-cell";
import type { Category } from "@/lib/types";
import type { ColumnHandlers } from "@/types/admin";

/**
 * Base category columns configuration with responsive widths
 */
export const categoryColumns: Column<Category>[] = [
  {
    key: "image",
    title: "Hình ảnh",
    width: 160,
    align: "center",
    className: "hidden sm:table-cell",
    render: (_, category) => (
      <ImageCell src={category.image} alt={category.name} size="md" />
    ),
  },
  {
    key: "name",
    title: "Tên danh mục",
    dataIndex: "name",
    className: "font-semibold text-gray-900 min-w-[200px] max-w-[280px]",
    render: (_, category) => (
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <span
            className="font-semibold text-gray-900 truncate"
            title={category.name}
          >
            {category.name}
          </span>
          {category.type === "premium" && (
            <BadgeCell label="Premium" variant="premium" />
          )}
        </div>
        {category.description && category.description !== category.name && (
          <span
            className="max-w-[240px] text-gray-500 text-sm truncate"
            title={category.description}
          >
            {category.description}
          </span>
        )}
        <IndustryTagsCell industries={category.industries} maxVisible={3} />
      </div>
    ),
  },
  {
    key: "section",
    title: "Phân loại",
    width: 140,
    className: "hidden md:table-cell",
    render: (_, category) => (
      <BadgeCell
        label={
          category.Section?.name || category.section?.name || "Chưa phân loại"
        }
        variant="section"
        maxWidth="max-w-[100px]"
      />
    ),
  },
  {
    key: "status",
    title: "Trạng thái",
    width: 140,
    align: "center",
    className: "min-w-[120px]",
    render: (_, category) => (
      <StatusCell
        isComingSoon={category.is_coming_soon || category.is_comming_soon}
        isActive={!category.is_coming_soon && !category.is_comming_soon}
      />
    ),
  },
  {
    key: "actions",
    title: "Thao tác",
    width: 120,
    align: "center",
    className: "min-w-[100px]",
    render: (_, category, index, context) => {
      const handlers = (context as ColumnHandlers) || {};
      return (
        <ActionsCell
          item={category}
          onEdit={handlers.onEdit}
          onDelete={item => handlers.onDelete?.(item.id)}
        />
      );
    },
  },
];

/**
 * Creates category columns with custom handlers
 *
 * @param handlers - The column handlers
 * @returns The configured category columns
 */
export const createCategoryColumns = (
  handlers: ColumnHandlers
): Column<Category>[] => {
  return categoryColumns.map(column => {
    if (column.key === "actions") {
      return {
        ...column,
        render: (value, category, index) =>
          column.render?.(value, category, index, handlers),
      };
    }
    return column;
  });
};
