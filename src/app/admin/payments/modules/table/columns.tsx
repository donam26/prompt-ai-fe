import type { ColumnDef } from "@tanstack/react-table";
import type { Payment } from "@/types";
import { Column } from "@/components/data-table/data-table";
import { StatusCell, BadgeCell, ActionsCell } from "@/components/table-cell";
import { CreditCard, DollarSign } from "lucide-react";

interface Props {
  onViewAction: (payment: Payment) => void;
  onDeleteAction: (payment: Payment) => void;
}

export function usePaymentColumns({
  onViewAction,
  onDeleteAction,
}: Props): ColumnDef<Payment>[] {
  return [
    {
      accessorKey: "id",
      meta: { title: "Mã GD" },
      header: () => <div className="font-medium">Mã GD</div>,
      cell: ({ row }) => (
        <span className="font-mono text-gray-600 text-sm">
          #{row.original.id}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "user",
      meta: { title: "Người dùng" },
      header: () => <div className="font-medium">Người dùng</div>,
      cell: ({ row }) => (
        <div className="flex flex-col space-y-1 min-w-[180px]">
          <span className="font-semibold text-gray-900">
            {row.original.user?.full_name ||
              row.original.user?.full_name ||
              "N/A"}
          </span>
          <span className="text-gray-500 text-sm">
            {row.original.user?.email || row.original.user?.email || "N/A"}
          </span>
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "amount",
      meta: { title: "Số tiền" },
      header: () => <div className="font-medium text-right">Số tiền</div>,
      cell: ({ row }) => (
        <div className="flex justify-end items-center gap-1">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-green-600">
            {row.original.amount?.toLocaleString("vi-VN") || "0"} VNĐ
          </span>
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "method",
      meta: { title: "Phương thức" },
      header: () => (
        <div className="hidden md:block font-medium">Phương thức</div>
      ),
      cell: ({ row }) => (
        <div className="hidden md:flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-gray-500" />
          <BadgeCell
            label={row.original.payment_method || "N/A"}
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
      cell: ({ row }) => {
        const statusConfig = {
          completed: { isActive: true, isComingSoon: false },
          pending: { isActive: false, isComingSoon: true },
          failed: { isActive: false, isComingSoon: false },
          cancelled: { isActive: false, isComingSoon: false },
        };

        const config = statusConfig[
          row.original.status as keyof typeof statusConfig
        ] || { isActive: false, isComingSoon: false };

        return (
          <div className="flex justify-center items-center min-w-[100px]">
            <StatusCell {...config} />
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "created_at",
      meta: { title: "Ngày tạo" },
      header: () => <div className="hidden lg:block font-medium">Ngày tạo</div>,
      cell: ({ row }) => (
        <div className="hidden lg:block">
          <span className="text-gray-600 text-sm">
            {row.original.created_at
              ? new Date(row.original.created_at).toLocaleDateString("vi-VN")
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
            onEdit={onViewAction}
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
 * @deprecated Use usePaymentColumns instead
 */
export const createPaymentColumns = (handlers: Props): ColumnDef<Payment>[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return usePaymentColumns(handlers);
};

/**
 * Adapter function to convert TanStack Table columns to custom DataTable columns
 */
export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<Payment>[]
): Column<Payment>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Payment, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Payment] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Payment] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Payment] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Payment] : "";
      },
      width: 200,
      align: "left" as const,
      className: "",
    };
  });
};
