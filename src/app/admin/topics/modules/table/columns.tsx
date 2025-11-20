"use client";

import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Topic } from "@/types";
import type { TopicColumnHandlers } from "@/types/admin/topic";
import { TOPICS_CONSTANTS } from "@/constants/topics";
import { ColumnDef } from "@tanstack/react-table";
import type { Column } from "@/components/data-table";

export const useTopicColumns = ({
  onEdit,
  onDelete,
}: TopicColumnHandlers): ColumnDef<Topic>[] => [
  {
    accessorKey: "name",
    header: TOPICS_CONSTANTS.TABLE.COLUMNS.NAME,
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
    header: TOPICS_CONSTANTS.TABLE.COLUMNS.CREATED_AT,
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div className="whitespace-nowrap text-gray-600 text-sm">
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
    header: TOPICS_CONSTANTS.TABLE.COLUMNS.UPDATED_AT,
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
    header: TOPICS_CONSTANTS.TABLE.COLUMNS.ACTIONS,
    cell: ({ row }) => {
      const topic = row.original;

      return (
        <div className="flex justify-center items-center gap-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(topic)}
              className="p-0 w-8 h-8"
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(topic)}
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

export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<Topic>[]
): Column<Topic>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = typeof col.header === "string" ? col.header : "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Topic, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Topic] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Topic] : undefined,
            });
          } catch {
            // Handle special cases for date formatting
            if (accessorKey === "createdAt" || accessorKey === "updatedAt") {
              const dateValue = record[accessorKey as keyof Topic] as string;
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
            return accessorKey ? record[accessorKey as keyof Topic] : "";
          }
        }
        // Handle special cases for date formatting
        if (accessorKey === "createdAt" || accessorKey === "updatedAt") {
          const dateValue = record[accessorKey as keyof Topic] as string;
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
        return accessorKey ? record[accessorKey as keyof Topic] : "";
      },
      width: 30,
      align: "left" as const,
      className: "",
    };
  });
};
