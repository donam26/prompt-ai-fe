import type { ColumnDef } from "@tanstack/react-table";
import type { ExpiringSubscription } from "@/types/admin/expiring-subscription";
import { Column } from "@/components/data-table/data-table";
import { BadgeCell, ActionsCell } from "@/components/table-cell";

interface Props {
  onEditAction: (item: ExpiringSubscription) => void;
}

const getInitials = (name: string | undefined | null): string => {
  if (!name || typeof name !== "string") {
    return "??";
  }
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export function useExpiringSubscriptionsColumns({
  onEditAction,
}: Props): ColumnDef<ExpiringSubscription>[] {
  return [
    {
      accessorKey: "name",
      meta: { title: "Người dùng" },
      header: () => <div className="font-medium">Người dùng</div>,
      cell: ({ row }) => {
        const item = row.original;
        const isUrgent = item.daysRemaining <= 2;

        return (
          <div className="flex items-center gap-3 min-w-[200px]">
            <div
              className={`flex flex-shrink-0 justify-center items-center rounded-full w-10 h-10 ${
                isUrgent
                  ? "bg-red-100 dark:bg-red-900/30"
                  : "bg-primary-100 dark:bg-primary-900/30"
              }`}
            >
              <span
                className={`font-semibold text-sm ${
                  isUrgent
                    ? "text-red-600 dark:text-red-400"
                    : "text-primary-600 dark:text-primary-400"
                }`}
              >
                {getInitials(item.userName || item.userEmail)}
              </span>
            </div>
            <div className="flex flex-col space-y-1 min-w-0">
              <span
                className="font-semibold text-gray-900 truncate"
                title={item.userName || "Unknown User"}
              >
                {item.userName || "Unknown User"}
              </span>
              <span
                className="max-w-[240px] text-gray-500 text-sm truncate"
                title={item.userEmail}
              >
                {item.userEmail}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "subscription",
      meta: { title: "Gói đăng ký" },
      header: () => <div className="font-medium">Gói đăng ký</div>,
      cell: ({ row }) => {
        const subscriptionName = row.original.subscriptionName || "N/A";
        return (
          <BadgeCell
            label={subscriptionName}
            variant="secondary"
            maxWidth="max-w-[150px]"
          />
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "endDate",
      meta: { title: "Ngày hết hạn" },
      header: () => <div className="font-medium">Ngày hết hạn</div>,
      cell: ({ row }) => {
        const item = row.original;
        const endDate = item.endDate;
        if (!endDate) return <span className="text-gray-400">N/A</span>;

        const daysRemaining = item.daysRemaining;
        const isUrgent = daysRemaining <= 2;

        return (
          <div className="flex flex-col space-y-1">
            <span className="text-gray-900 text-sm">{formatDate(endDate)}</span>
            <span
              className={`text-xs font-medium ${
                isUrgent
                  ? "text-red-600 dark:text-red-400"
                  : daysRemaining <= 5
                    ? "text-orange-600 dark:text-orange-400"
                    : "text-gray-500"
              }`}
            >
              {daysRemaining > 0
                ? `Còn ${daysRemaining} ngày`
                : daysRemaining === 0
                  ? "Hết hạn hôm nay"
                  : "Đã hết hạn"}
            </span>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "token",
      meta: { title: "Token còn lại" },
      header: () => (
        <div className="hidden md:block font-medium">Token còn lại</div>
      ),
      cell: ({ row }) => {
        const token = row.original.token || 0;
        return (
          <div className="hidden md:block">
            <span className="font-medium text-gray-900">
              {token.toLocaleString("vi-VN")}
            </span>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      id: "actions",
      meta: { title: "Thao tác" },
      header: () => (
        <div className="w-full font-medium text-center">Thao tác</div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <ActionsCell item={row.original} onEdit={onEditAction} />
        </div>
      ),
      enableSorting: false,
    },
  ];
}

/**
 * Adapter function to convert TanStack Table columns to custom DataTable columns
 */
export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<ExpiringSubscription>[]
): Column<ExpiringSubscription>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: ExpiringSubscription, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey
                  ? record[accessorKey as keyof ExpiringSubscription]
                  : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey
                  ? record[accessorKey as keyof ExpiringSubscription]
                  : undefined,
            });
          } catch {
            return accessorKey
              ? record[accessorKey as keyof ExpiringSubscription]
              : "";
          }
        }
        return accessorKey
          ? record[accessorKey as keyof ExpiringSubscription]
          : "";
      },
      width: 200,
      align: "left" as const,
      className: "",
    };
  });
};
