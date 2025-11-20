import type { ColumnDef } from "@tanstack/react-table";
import type { User } from "@/types";
import { Column } from "@/components/data-table/data-table";
import { StatusCell, BadgeCell, ActionsCell } from "@/components/table-cell";
import { getUserRoleLabel, isAdminRole } from "@/types/enums";

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
      accessorKey: "name",
      meta: { title: "Tên người dùng" },
      header: () => <div className="font-medium">Tên người dùng</div>,
      cell: ({ row }) => (
        <div className="flex flex-col space-y-1 min-w-[200px] max-w-[300px]">
          <div className="flex items-center gap-2">
            <span
              className="flex-1 font-semibold text-gray-900 line-clamp-2"
              title={row.original.fullName || "Unknown User"}
            >
              {row.original.fullName || "Unknown User"}
            </span>
            {isAdminRole(row.original.role) && (
              <BadgeCell label="Admin" variant="secondary" />
            )}
          </div>
          <span
            className="max-w-[300px] text-gray-500 text-sm line-clamp-2"
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
      header: () => <div className="font-medium">Vai trò</div>,
      cell: ({ row }) => (
        <div>
          <BadgeCell
            label={getUserRoleLabel(row.original.role)}
            variant="secondary"
            maxWidth="max-w-[100px]"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "accountStatus",
      meta: { title: "Trạng thái" },
      header: () => (
        <div className="w-full font-medium text-center">Trạng thái</div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center min-w-[100px]">
          <StatusCell
            isActive={row.original.accountStatus === 1}
            isComingSoon={false}
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      meta: { title: "Ngày tạo" },
      header: () => <div className="font-medium">Ngày tạo</div>,
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
          <span className="text-gray-600 text-sm">
            {row.original.createdAt
              ? new Date(row.original.createdAt).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })
              : "N/A"}
          </span>
        </div>
      ),
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "subscription",
      meta: { title: "Gói & Prompt" },
      header: () => <div className="font-medium">Gói & Prompt</div>,
      cell: ({ row }) => {
        const subscriptionName =
          row.original.userSub?.subscription?.nameSub ||
          row.original.userSub?.Subscription?.nameSub ||
          "Chưa có gói";
        const countPrompt = row.original.countPromt ?? 0;

        return (
          <div className="flex flex-col space-y-2">
            <BadgeCell
              label={subscriptionName}
              variant="secondary"
              maxWidth="max-w-[150px]"
            />
            <BadgeCell
              label={`${countPrompt} tokens`}
              variant="custom"
              maxWidth="max-w-[100px]"
            />
          </div>
        );
      },
      enableSorting: false,
    },
    {
      id: "actions",
      meta: { title: "Thao tác" },
      header: () => <div className="font-medium text-center">Thao tác</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-1">
          <ActionsCell
            item={row.original}
            onEdit={onEditAction}
            onDelete={onDeleteAction}
          />
        </div>
      ),
      enableSorting: false,
      size: 100,
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
      width: 30,
      align: "left" as const,
      className: "",
    };
  });
};
