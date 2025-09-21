import React from "react";
import { Building2 } from "lucide-react";

import { Column } from "@/components/data-table/data-table";
import { StatusCell, BadgeCell, ActionsCell } from "@/components/table-cell";
import type { Industry } from "@/lib/types";
import type { IndustryColumnHandlers } from "@/types/admin";

/**
 * Base industry columns configuration with responsive widths
 */
export const industryColumns: Column<Industry>[] = [
  {
    key: "name",
    title: "Tên ngành nghề",
    dataIndex: "name",
    className: "font-semibold text-gray-900 min-w-[200px] max-w-[300px]",
    render: (_, industry) => (
      <div className="flex items-center gap-2">
        <Building2 className="w-4 h-4 text-gray-500" />
        <span
          className="font-semibold text-gray-900 truncate"
          title={industry.name}
        >
          {industry.name}
        </span>
      </div>
    ),
  },
  {
    key: "description",
    title: "Mô tả",
    dataIndex: "description",
    className: "hidden md:table-cell",
    render: (_, industry) => (
      <span
        className="max-w-[300px] text-gray-500 text-sm truncate"
        title={industry.description}
      >
        {industry.description || "Không có mô tả"}
      </span>
    ),
  },
  {
    key: "order",
    title: "Thứ tự",
    width: 100,
    align: "center",
    className: "hidden lg:table-cell",
    render: (_, industry) => (
      <BadgeCell
        label={industry.order?.toString() || "0"}
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
    render: (_, industry) => (
      <StatusCell
        isActive={industry.status === "active"}
        isComingSoon={industry.status === "inactive"}
      />
    ),
  },
  {
    key: "createdAt",
    title: "Ngày tạo",
    width: 140,
    className: "hidden lg:table-cell",
    render: (_, industry) => (
      <span className="text-gray-600 text-sm">
        {industry.createdAt
          ? new Date(industry.createdAt).toLocaleDateString("vi-VN")
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
    render: (_, industry, index, context) => {
      const handlers = (context as IndustryColumnHandlers) || {};
      return (
        <ActionsCell
          item={industry}
          onEdit={handlers.onEdit}
          onDelete={item => handlers.onDelete?.(item.id)}
        />
      );
    },
  },
];

/**
 * Creates industry columns with custom handlers
 *
 * @param handlers - The column handlers
 * @returns The configured industry columns
 */
export const createIndustryColumns = (
  handlers: IndustryColumnHandlers
): Column<Industry>[] => {
  return industryColumns.map(column => {
    if (column.key === "actions") {
      return {
        ...column,
        render: (value, industry, index) =>
          column.render?.(value, industry, index, handlers),
      };
    }
    return column;
  });
};
