import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/types";
import { Column } from "@/components/data-table/data-table";
import {
  ImageCell,
  StatusCell,
  BadgeCell,
  ActionsCell,
} from "@/components/table-cell";

interface Props {
  onEditAction: (user: User) => void;
  onDeleteAction: (user: User) => void;
}

export function useUserColumns({
  onEditAction,
  onDeleteAction,
}: Props): ColumnDef<User>[] {
  return [
    {
      accessorKey: "avatar",
      meta: { title: "Ảnh đại diện" },
      header: () => (
        <div className="w-full font-medium text-center">Ảnh đại diện</div>
      ),
      cell: ({ row }) => (
        <div className="hidden sm:flex justify-center">
          <ImageCell
            src={row.original.avatar}
            alt={row.original.fullName || "User"}
            size="sm"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      meta: { title: "Tên người dùng" },
      header: () => <div className="font-medium">Tên người dùng</div>,
      cell: ({ row }) => (
        <div className="flex flex-col space-y-1 min-w-[200px] max-w-[280px]">
          <div className="flex items-center gap-2">
            <span
              className="font-semibold text-gray-900 truncate"
              title={row.original.fullName || "Unknown User"}
            >
              {row.original.fullName || "Unknown User"}
            </span>
            {row.original.roleId === 1 && (
              <BadgeCell label="Admin" variant="secondary" />
            )}
          </div>
          <span
            className="max-w-[240px] text-gray-500 text-sm truncate"
            title={row.original.email}
          >
            {row.original.email}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "role",
      meta: { title: "Vai trò" },
      header: () => <div className="hidden md:block font-medium">Vai trò</div>,
      cell: ({ row }) => (
        <div className="hidden md:block">
          <BadgeCell
            label={row.original.roleId === 1 ? "Admin" : "User"}
            variant="secondary"
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
      cell: () => (
        <div className="flex justify-center items-center min-w-[100px]">
          <StatusCell isActive={true} isComingSoon={false} />
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

/**
 * Legacy function for backward compatibility
 * @deprecated Use useUserColumns instead
 */
export const createUserColumns = (handlers: Props): ColumnDef<User>[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useUserColumns(handlers);
};

/**
 * Adapter function to convert TanStack Table columns to custom DataTable columns
 */
export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<User>[]
): Column<User>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: User, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof User] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof User] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof User] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof User] : "";
      },
      width: 200,
      align: "left" as const,
      className: "",
    };
  });
};
