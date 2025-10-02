"use client";

import type { Payment } from "@/types";
import { CreditCard, DollarSign, User, Calendar, Hash } from "lucide-react";
import { BadgeCell } from "@/components/table-cell";
import { getPaymentStatusConfig } from "@/constants/payment-status";

interface Props {
  payment: Payment;
}

export const PaymentBasicFields = ({ payment }: Props) => {
  const getStatusBadge = (status: string) => {
    const config = getPaymentStatusConfig(status);

    return (
      <BadgeCell
        value={config.label}
        variant={config.variant}
        className="text-sm"
      />
    );
  };

  const formatAmount = (amount: number) => {
    if (!amount || amount === 0) return "0 VNĐ";

    // Convert to integer to remove decimal places
    const integerAmount = Math.round(amount);

    // Format with dots as thousands separator for better readability
    const formatted = integerAmount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${formatted} VNĐ`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-gray-500 text-sm">Mã giao dịch</p>
            <p className="font-mono font-semibold">#{payment.id}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <DollarSign className="w-5 h-5 text-green-600" />
          <div>
            <p className="text-gray-500 text-sm">Số tiền</p>
            <p className="font-semibold text-green-600 text-lg">
              {formatAmount(payment.amount)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-gray-500 text-sm">Phương thức thanh toán</p>
            <p className="font-semibold">{payment.paymentMethod || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center w-5 h-5">
            <div className="bg-blue-500 rounded-full w-3 h-3"></div>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Trạng thái</p>
            <div className="mt-1">{getStatusBadge(payment.paymentStatus)}</div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-gray-500" />
          <div>
            <p className="text-gray-500 text-sm">Ngày thanh toán</p>
            <p className="font-semibold">
              {payment.paymentDate ? formatDate(payment.paymentDate) : "N/A"}
            </p>
          </div>
        </div>

        {payment.updatedAt && payment.updatedAt !== payment.createdAt && (
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-gray-500 text-sm">Ngày cập nhật</p>
              <p className="font-semibold">{formatDate(payment.updatedAt)}</p>
            </div>
          </div>
        )}

        {payment.user && (
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-gray-500 text-sm">Người dùng</p>
              <p className="font-semibold">
                {payment.user.fullName || payment.user.email || "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
