import type { ColumnDef } from "@tanstack/react-table";
import type { Role } from "@/types";
import { Column } from "@/components/data-table/data-table";
import { BadgeCell, ActionsCell } from "@/components/table-cell";

interface Props {
  onEditAction: (role: Role) => void;
  onDeleteAction: (role: Role) => void;
}

export function useRoleColumns({
  onEditAction,
  onDeleteAction,
}: Props): ColumnDef<Role>[] {
  return [
    {
      accessorKey: "name",
      meta: { title: "Tên vai trò" },
      header: () => <div className="font-medium">Tên vai trò</div>,
      cell: ({ row }) => (
        <div className="flex flex-col space-y-1 min-w-[200px] max-w-[300px]">
          <span
            className="font-semibold text-gray-900 line-clamp-2"
            title={row.original.name}
          >
            {row.original.name}
          </span>
          {row.original.description && (
            <span
              className="max-w-[300px] text-gray-500 text-xs line-clamp-2"
              title={row.original.description}
            >
              {row.original.description}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "permissions",
      meta: { title: "Quyền hạn" },
      header: () => <div className="font-medium">Quyền hạn</div>,
      cell: ({ row }) => (
        <BadgeCell
          label={`${row.original.permissions?.length || 0} quyền`}
          variant="secondary"
          className="min-w-[100px]"
        />
      ),
      enableSorting: false,
      size: 120,
    },
    {
      accessorKey: "createdAt",
      meta: { title: "Ngày tạo" },
      header: () => <div className="font-medium">Ngày tạo</div>,
      cell: ({ row }) => (
        <div className="">
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
        <div className="flex justify-center items-center min-w-[120px]">
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

export const createRoleColumns = (handlers: Props): ColumnDef<Role>[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useRoleColumns(handlers);
};

export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<Role>[]
): Column<Role>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Role, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Role] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Role] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Role] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Role] : "";
      },
      width: 200,
      align: "left" as const,
      className: "",
    };
  });
};
