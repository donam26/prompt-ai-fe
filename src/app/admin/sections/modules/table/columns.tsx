import React from "react";
import { Folder } from "lucide-react";

import { Column } from "@/components/data-table/data-table";
import { StatusCell, BadgeCell, ActionsCell } from "@/components/table-cell";
import type { Section } from "@/lib/types";
import type { SectionColumnHandlers } from "@/types/admin";

/**
 * Base section columns configuration with responsive widths
 */
export const sectionColumns: Column<Section>[] = [
  {
    key: "name",
    title: "Tên phân loại",
    dataIndex: "name",
    className: "font-semibold text-gray-900 min-w-[200px] max-w-[300px]",
    render: (_, section) => (
      <div className="flex items-center gap-2">
        <Folder className="w-4 h-4 text-gray-500" />
        <span
          className="font-semibold text-gray-900 truncate"
          title={section.name}
        >
          {section.name}
        </span>
      </div>
    ),
  },
  {
    key: "description",
    title: "Mô tả",
    dataIndex: "description",
    className: "hidden md:table-cell",
    render: (_, section) => (
      <span
        className="max-w-[300px] text-gray-500 text-sm truncate"
        title={section.description}
      >
        {section.description || "Không có mô tả"}
      </span>
    ),
  },
  {
    key: "order",
    title: "Thứ tự",
    width: 100,
    align: "center",
    className: "hidden lg:table-cell",
    render: (_, section) => (
      <BadgeCell
        label={section.order?.toString() || "0"}
        variant="secondary"
        maxWidth="max-w-[60px]"
      />
    ),
  },
  {
    key: "status",
    title: "Trạng thái",
    width: 120,
    align: "center",
    className: "min-w-[100px]",
    render: (_, section) => (
      <StatusCell
        isActive={section.status === "active"}
        isComingSoon={section.status === "inactive"}
      />
    ),
  },
  {
    key: "createdAt",
    title: "Ngày tạo",
    width: 140,
    className: "hidden lg:table-cell",
    render: (_, section) => (
      <span className="text-gray-600 text-sm">
        {section.createdAt
          ? new Date(section.createdAt).toLocaleDateString("vi-VN")
          : "N/A"}
      </span>
    ),
  },
  {
    key: "actions",
    title: "Thao tác",
    width: 120,
    align: "center",
    className: "min-w-[100px]",
    render: (_, section, index, context) => {
      const handlers = (context as SectionColumnHandlers) || {};
      return (
        <ActionsCell
          item={section}
          onEdit={handlers.onEdit}
          onDelete={item => handlers.onDelete?.(item.id)}
        />
      );
    },
  },
];

/**
 * Creates section columns with custom handlers
 *
 * @param handlers - The column handlers
 * @returns The configured section columns
 */
export const createSectionColumns = (
  handlers: SectionColumnHandlers
): Column<Section>[] => {
  return sectionColumns.map(column => {
    if (column.key === "actions") {
      return {
        ...column,
        render: (value, section, index) =>
          column.render?.(value, section, index, handlers),
      };
    }
    return column;
  });
};
