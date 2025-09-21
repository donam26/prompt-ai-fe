import React from "react";
import { CreditCard, DollarSign } from "lucide-react";

import { Column } from "@/components/data-table/data-table";
import { StatusCell, BadgeCell, ActionsCell } from "@/components/table-cell";
import type { Payment } from "@/lib/types";
import type { PaymentColumnHandlers } from "@/types/admin";

/**
 * Base payment columns configuration with responsive widths
 */
export const paymentColumns: Column<Payment>[] = [
  {
    key: "id",
    title: "Mã GD",
    width: 120,
    className: "font-mono text-sm",
    render: (_, payment) => (
      <span className="text-gray-600">#{payment.id}</span>
    ),
  },
  {
    key: "user",
    title: "Người dùng",
    width: 200,
    className: "min-w-[180px]",
    render: (_, payment) => (
      <div className="flex flex-col space-y-1">
        <span className="font-semibold text-gray-900">
          {payment.user?.name || payment.userName || "N/A"}
        </span>
        <span className="text-gray-500 text-sm">
          {payment.user?.email || payment.userEmail || "N/A"}
        </span>
      </div>
    ),
  },
  {
    key: "amount",
    title: "Số tiền",
    width: 140,
    align: "right",
    className: "font-semibold",
    render: (_, payment) => (
      <div className="flex justify-end items-center gap-1">
        <DollarSign className="w-4 h-4 text-green-600" />
        <span className="font-semibold text-green-600">
          {payment.amount?.toLocaleString("vi-VN") || "0"} VNĐ
        </span>
      </div>
    ),
  },
  {
    key: "method",
    title: "Phương thức",
    width: 140,
    className: "hidden md:table-cell",
    render: (_, payment) => (
      <div className="flex items-center gap-2">
        <CreditCard className="w-4 h-4 text-gray-500" />
        <BadgeCell
          label={payment.method || "N/A"}
          variant="secondary"
          maxWidth="max-w-[100px]"
        />
      </div>
    ),
  },
  {
    key: "status",
    title: "Trạng thái",
    width: 120,
    align: "center",
    className: "min-w-[100px]",
    render: (_, payment) => {
      const statusConfig = {
        completed: { isActive: true, isComingSoon: false },
        pending: { isActive: false, isComingSoon: true },
        failed: { isActive: false, isComingSoon: false },
        cancelled: { isActive: false, isComingSoon: false },
      };

      const config = statusConfig[
        payment.status as keyof typeof statusConfig
      ] || { isActive: false, isComingSoon: false };

      return <StatusCell {...config} />;
    },
  },
  {
    key: "createdAt",
    title: "Ngày tạo",
    width: 140,
    className: "hidden lg:table-cell",
    render: (_, payment) => (
      <span className="text-gray-600 text-sm">
        {payment.createdAt
          ? new Date(payment.createdAt).toLocaleDateString("vi-VN")
          : "N/A"}
      </span>
    ),
  },
  {
    key: "actions",
    title: "Thao tác",
    width: 120,
    align: "center",
    className: "min-w-[100px]",
    render: (_, payment, index, context) => {
      const handlers = (context as PaymentColumnHandlers) || {};
      return (
        <ActionsCell
          item={payment}
          onView={handlers.onView}
          onDelete={item => handlers.onDelete?.(item.id)}
        />
      );
    },
  },
];

/**
 * Creates payment columns with custom handlers
 *
 * @param handlers - The column handlers
 * @returns The configured payment columns
 */
export const createPaymentColumns = (
  handlers: PaymentColumnHandlers
): Column<Payment>[] => {
  return paymentColumns.map(column => {
    if (column.key === "actions") {
      return {
        ...column,
        render: (value, payment, index) =>
          column.render?.(value, payment, index, handlers),
      };
    }
    return column;
  });
};
