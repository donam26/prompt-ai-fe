import type { ColumnDef } from "@tanstack/react-table";
import type { Industry } from "@/types";
import { Column } from "@/components/data-table/data-table";
import { ActionsCell } from "@/components/table-cell";
import { Building2 } from "lucide-react";

interface Props {
  onEditAction: (industry: Industry) => void;
  onDeleteAction: (industry: Industry) => void;
}

export function useIndustryColumns({
  onEditAction,
  onDeleteAction,
}: Props): ColumnDef<Industry>[] {
  return [
    {
      accessorKey: "name",
      meta: { title: "Tên ngành nghề" },
      header: () => <div className="font-medium">Tên ngành nghề</div>,
      cell: ({ row }) => (
        <div className="flex items-start gap-2 min-w-[200px] max-w-[300px]">
          <Building2 className="flex-shrink-0 mt-0.5 w-4 h-4 text-gray-500" />
          <span
            className="font-semibold text-gray-900 line-clamp-2"
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
      header: () => <div className="font-medium">Ngày tạo</div>,
      cell: ({ row }) => (
        <div>
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
 * @deprecated Use useIndustryColumns instead
 */
export const createIndustryColumns = (
  handlers: Props
): ColumnDef<Industry>[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useIndustryColumns(handlers);
};

/**
 * Adapter function to convert TanStack Table columns to custom DataTable columns
 */
export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<Industry>[]
): Column<Industry>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Industry, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Industry] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Industry] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Industry] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Industry] : "";
      },
      width: 200,
      align: "left" as const,
      className: "",
    };
  });
};
