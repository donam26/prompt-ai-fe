"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { BlogCategory } from "@/types";
import type { BlogCategoryColumnHandlers } from "@/types/admin/blog-category";
import { BLOG_CATEGORY_CONSTANTS } from "@/constants/blog-category";

// Define the columns for the blog category table
export const useBlogCategoryColumns = ({
  onEditAction,
  onDeleteAction,
}: BlogCategoryColumnHandlers): ColumnDef<BlogCategory>[] => [
  {
    accessorKey: "name",
    header: BLOG_CATEGORY_CONSTANTS.TABLE.COLUMNS.NAME,
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      return (
        <div className="max-w-[200px] font-medium text-gray-900 truncate">
          {name}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: BLOG_CATEGORY_CONSTANTS.TABLE.COLUMNS.CREATED_AT,
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div className="text-gray-600 text-sm whitespace-nowrap">
          {new Date(createdAt).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })}
        </div>
      );
    },
    size: 160,
  },
  {
    accessorKey: "updatedAt",
    header: BLOG_CATEGORY_CONSTANTS.TABLE.COLUMNS.UPDATED_AT,
    cell: ({ row }) => {
      const updatedAt = row.getValue("updatedAt") as string;
      return (
        <div className="text-gray-600 text-sm">
          {new Date(updatedAt).toLocaleString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: BLOG_CATEGORY_CONSTANTS.TABLE.COLUMNS.ACTIONS,
    cell: ({ row }) => {
      const blogCategory = row.original;

      return (
        <div className="flex justify-center items-center gap-2">
          {onEditAction && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEditAction(blogCategory)}
              className="p-0 w-8 h-8"
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
          {onDeleteAction && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteAction(blogCategory)}
              className="p-0 w-8 h-8 text-red-600 hover:text-red-700"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      );
    },
    size: 100,
  },
];

// Adapter function to convert TanStack columns to our DataTable format
export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<BlogCategory>[]
): any[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = typeof col.header === "string" ? col.header : "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: BlogCategory, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey
                  ? record[accessorKey as keyof BlogCategory]
                  : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey
                  ? record[accessorKey as keyof BlogCategory]
                  : undefined,
            });
          } catch {
            // Handle special cases for date formatting
            if (accessorKey === "createdAt" || accessorKey === "updatedAt") {
              const dateValue = record[
                accessorKey as keyof BlogCategory
              ] as string;
              return (
                <div className="text-gray-600 text-sm">
                  {new Date(dateValue).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </div>
              );
            }
            return accessorKey ? record[accessorKey as keyof BlogCategory] : "";
          }
        }
        // Handle special cases for date formatting
        if (accessorKey === "createdAt" || accessorKey === "updatedAt") {
          const dateValue = record[accessorKey as keyof BlogCategory] as string;
          return (
            <div className="text-gray-600 text-sm">
              {new Date(dateValue).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </div>
          );
        }
        return accessorKey ? record[accessorKey as keyof BlogCategory] : "";
      },
      width: 30,
      align: "left" as const,
      className: "",
    };
  });
};
