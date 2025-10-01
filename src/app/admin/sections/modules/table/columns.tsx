import type { ColumnDef } from "@tanstack/react-table";
import type { Section } from "@/types";
import { Column } from "@/components/data-table/data-table";
import { ActionsCell } from "@/components/table-cell";
import { Folder } from "lucide-react";

interface Props {
  onEditAction: (section: Section) => void;
  onDeleteAction: (section: Section) => void;
}

export function useSectionColumns({
  onEditAction,
  onDeleteAction,
}: Props): ColumnDef<Section>[] {
  return [
    {
      accessorKey: "name",
      meta: { title: "Tên phân loại" },
      header: () => <div className="font-medium">Tên phân loại</div>,
      cell: ({ row }) => (
        <div className="flex items-center gap-2 min-w-[200px] max-w-[300px]">
          <Folder className="w-4 h-4 text-gray-500" />
          <span
            className="font-semibold text-gray-900 truncate"
            title={row.original.name}
          >
            {row.original.name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "description",
      meta: { title: "Mô tả" },
      header: () => <div className="hidden md:block font-medium">Mô tả</div>,
      cell: ({ row }) => (
        <div className="hidden md:block">
          <span
            className="max-w-[300px] text-gray-500 text-sm truncate"
            title={row.original.description}
          >
            {row.original.description || "Không có mô tả"}
          </span>
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
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
        <div className="flex justify-center items-center min-w-[100px]">
          <ActionsCell
            item={row.original}
            onEdit={onEditAction}
            onDelete={onDeleteAction}
          />
        </div>
      ),
      enableSorting: false,
    },
  ];
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use useSectionColumns instead
 */
export const createSectionColumns = (handlers: Props): ColumnDef<Section>[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSectionColumns(handlers);
};

/**
 * Adapter function to convert TanStack Table columns to custom DataTable columns
 */
export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<Section>[]
): Column<Section>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Section, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Section] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Section] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Section] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Section] : "";
      },
      width: 200,
      align: "left" as const,
      className: "",
    };
  });
};
