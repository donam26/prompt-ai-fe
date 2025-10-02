"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Subscription } from "@/types";
import type { SubscriptionColumnHandlers } from "@/types/admin/subscription";
import { Column } from "@/components/data-table";
import { ActionsCell, ImageCell } from "@/components/table-cell";
import { formatBillingCycle } from "@/types/enums";

export function useSubscriptionColumns({
  onEdit,
  onDelete,
}: SubscriptionColumnHandlers): ColumnDef<Subscription>[] {
  return [
    {
      accessorKey: "imageDiscount",
      meta: { title: "Ảnh" },
      header: () => <div className="font-medium">Ảnh</div>,
      cell: ({ row }) => (
        <div className="hidden sm:flex justify-center">
          <ImageCell
            src={row.original.imageDiscount}
            alt={row.original.imageDiscount}
            size="md"
          />
        </div>
      ),
      size: 80,
    },
    {
      accessorKey: "id",
      meta: { title: "ID" },
      header: () => <div className="font-medium">ID</div>,
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.original.id}</div>
      ),
      size: 80,
    },
    {
      accessorKey: "name",
      meta: { title: "Tên gói" },
      header: () => <div className="font-medium">Tên gói</div>,
      cell: ({ row }) => (
        <div className="flex flex-col space-y-1 min-w-[200px]">
          <span className="font-semibold text-gray-900 truncate">
            {row.original.name}
          </span>
          {row.original.description && (
            <span className="text-gray-500 text-xs truncate">
              {!!row.original.description && (
                <div className="font-semibold text-green-600">
                  Gía gốc:{" "}
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(row.original.description as unknown as number)}
                </div>
              )}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "duration",
      meta: { title: "Số token" },
      header: () => <div className="font-medium">Số token</div>,
      cell: ({ row }) => (
        <div className="font-medium text-blue-600">
          {row.original.duration?.toLocaleString() || 0}
        </div>
      ),
    },
    {
      accessorKey: "price",
      meta: { title: "Giá tiền" },
      header: () => <div className="font-medium">Giá tiền</div>,
      cell: ({ row }) => (
        <div className="font-semibold text-green-600">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(row.original.price)}
        </div>
      ),
    },
    {
      accessorKey: "billingCycle",
      meta: { title: "Chu kỳ" },
      header: () => <div className="font-medium">Chu kỳ</div>,
      cell: ({ row }) => (
        <div className="font-medium text-blue-600">
          {formatBillingCycle(row.original.billingCycle)}
        </div>
      ),
    },
    {
      id: "actions",
      meta: { title: "Thao tác" },
      header: () => <div className="font-medium text-center">Thao tác</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center min-w-[120px]">
          <ActionsCell
            item={row.original}
            onEdit={onEdit}
            onDelete={onDelete}
          />
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
  tanstackColumns: ColumnDef<Subscription>[]
): Column<Subscription>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Subscription, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey
                  ? record[accessorKey as keyof Subscription]
                  : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey
                  ? record[accessorKey as keyof Subscription]
                  : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Subscription] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Subscription] : "";
      },
      width: 200,
      align: "left" as const,
      className: "",
    };
  });
};
