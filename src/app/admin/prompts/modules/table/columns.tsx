import type { ColumnDef } from "@tanstack/react-table";
import type { Prompt } from "@/lib/types";
import { Column } from "@/components/data-table/data-table";
import {
  ImageCell,
  StatusCell,
  BadgeCell,
  ActionsCell,
} from "@/components/table-cell";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface Props {
  onEditAction: (prompt: Prompt) => void;
  onDeleteAction: (prompt: Prompt) => void;
  onTogglePublicAction: (prompt: Prompt) => void;
}

export function usePromptColumns({
  onEditAction,
  onDeleteAction,
  onTogglePublicAction,
}: Props): ColumnDef<Prompt>[] {
  return [
    {
      accessorKey: "image",
      meta: { title: "Hình ảnh" },
      header: () => (
        <div className="w-full font-medium text-center">Hình ảnh</div>
      ),
      cell: ({ row }) => (
        <div className="hidden sm:flex justify-center">
          <ImageCell
            src={row.original.image}
            alt={row.original.title}
            size="md"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "title",
      meta: { title: "Tiêu đề" },
      header: () => <div className="font-medium">Tiêu đề</div>,
      cell: ({ row }) => (
        <div className="flex flex-col space-y-1 min-w-[200px] max-w-[300px]">
          <div className="flex items-center gap-2">
            <span
              className="font-semibold text-gray-900 truncate"
              title={row.original.title}
            >
              {row.original.title}
            </span>
            {row.original.isPremium && (
              <BadgeCell label="Premium" variant="premium" />
            )}
          </div>
          {row.original.description && (
            <span
              className="max-w-[280px] text-gray-500 text-sm truncate"
              title={row.original.description}
            >
              {row.original.description}
            </span>
          )}
          {row.original.tags && row.original.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {row.original.tags.length > 3 && (
                <span className="text-gray-400 text-xs">
                  +{row.original.tags.length - 3} khác
                </span>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "category",
      meta: { title: "Danh mục" },
      header: () => <div className="hidden md:block font-medium">Danh mục</div>,
      cell: ({ row }) => (
        <div className="hidden md:block">
          <BadgeCell
            label={
              row.original.category?.name ||
              row.original.Category?.name ||
              "Chưa phân loại"
            }
            variant="section"
            maxWidth="max-w-[100px]"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "status",
      meta: { title: "Trạng thái" },
      header: () => (
        <div className="w-full font-medium text-center">Trạng thái</div>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col items-center space-y-1 min-w-[100px]">
          <StatusCell
            isActive={row.original.isActive !== false}
            isComingSoon={row.original.isComingSoon}
          />
          <div className="flex items-center gap-1">
            {row.original.isPublic ? (
              <Eye className="w-3 h-3 text-green-500" />
            ) : (
              <EyeOff className="w-3 h-3 text-gray-400" />
            )}
            <span className="text-gray-500 text-xs">
              {row.original.isPublic ? "Công khai" : "Riêng tư"}
            </span>
          </div>
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "created_at",
      meta: { title: "Ngày tạo" },
      header: () => <div className="hidden lg:block font-medium">Ngày tạo</div>,
      cell: ({ row }) => (
        <div className="hidden lg:block">
          <span className="text-gray-600 text-sm">
            {row.original.createdAt
              ? new Date(row.original.createdAt).toLocaleDateString("vi-VN")
              : "N/A"}
          </span>
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "actions",
      meta: { title: "Thao tác" },
      header: () => <div className="font-medium text-center">Thao tác</div>,
      cell: ({ row }) => (
        <div className="flex items-center gap-1 min-w-[140px]">
          <ActionsCell
            item={row.original}
            onEdit={onEditAction}
            onDelete={onDeleteAction}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTogglePublicAction(row.original)}
            className="p-0 w-8 h-8"
            title={
              row.original.isPublic ? "Ẩn khỏi công khai" : "Hiện công khai"
            }
          >
            {row.original.isPublic ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </Button>
        </div>
      ),
      enableSorting: false,
    },
  ];
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use usePromptColumns instead
 */
export const createPromptColumns = (handlers: Props): ColumnDef<Prompt>[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return usePromptColumns(handlers);
};

/**
 * Adapter function to convert TanStack Table columns to custom DataTable columns
 */
export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<Prompt>[]
): Column<Prompt>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Prompt, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Prompt] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Prompt] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Prompt] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Prompt] : "";
      },
      width: 200,
      align: "left" as const,
      className: "",
    };
  });
};
