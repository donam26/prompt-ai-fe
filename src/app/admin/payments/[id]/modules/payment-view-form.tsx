"use client";

import type { Payment } from "@/types";
import {
  ArrowLeft,
  CreditCard,
  DollarSign,
  User,
  Calendar,
  Hash,
} from "lucide-react";
import { AdminContentCard, AdminPageLayout } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { BadgeCell } from "@/components/table-cell";
import { Separator } from "@/components/ui/separator";
import { PAYMENTS_CONSTANTS } from "@/constants/payments";
import { getPaymentStatusConfig } from "@/constants/payment-status";

export interface Props {
  payment?: Payment | null;
  isLoading?: boolean;
  onBack: () => void;
  className?: string;
}

export const PaymentViewForm = ({
  payment,
  isLoading = false,
  onBack,
}: Props) => {
  if (isLoading || !payment) {
    return (
      <AdminPageLayout
        title="Chi tiết giao dịch"
        description="Đang tải thông tin giao dịch..."
      >
        <AdminContentCard>
          <div className="space-y-4 animate-pulse">
            <div className="bg-gray-200 rounded w-1/4 h-4"></div>
            <div className="bg-gray-200 rounded w-1/2 h-4"></div>
            <div className="bg-gray-200 rounded w-3/4 h-4"></div>
          </div>
        </AdminContentCard>
      </AdminPageLayout>
    );
  }

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
    <AdminPageLayout
      title="Chi tiết giao dịch"
      description={`Giao dịch #${payment.id}`}
      actions={
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Payment Overview */}
        <AdminContentCard>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Thông tin giao dịch</h3>
            {getStatusBadge(payment.paymentStatus)}
          </div>

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
                  <p className="text-gray-500 text-sm">
                    Phương thức thanh toán
                  </p>
                  <p className="font-semibold">
                    {payment.paymentMethod || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-500 text-sm">Ngày thanh toán</p>
                  <p className="font-semibold">
                    {payment.paymentDate
                      ? formatDate(payment.paymentDate)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AdminContentCard>

        {/* User Information */}
        {payment.user && (
          <AdminContentCard>
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-gray-500" />
              <h3 className="font-semibold text-lg">Thông tin người dùng</h3>
            </div>

            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 text-sm">Họ và tên</p>
                  <p className="font-semibold">
                    {payment.user.fullName || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-semibold">{payment.user.email || "N/A"}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 text-sm">ID người dùng</p>
                  <p className="font-mono text-sm">#{payment.user.id}</p>
                </div>
              </div>
            </div>
          </AdminContentCard>
        )}

        {/* Additional Information */}
        <AdminContentCard>
          <h3 className="mb-4 font-semibold text-lg">Thông tin bổ sung</h3>

          <div className="space-y-4">
            {payment.transactionId && (
              <div>
                <p className="mb-2 text-gray-500 text-sm">ID giao dịch</p>
                <p className="font-mono text-sm">{payment.transactionId}</p>
              </div>
            )}

            {payment.vnpResponseCode && (
              <div>
                <p className="mb-2 text-gray-500 text-sm">Mã phản hồi VNPay</p>
                <p className="font-mono text-sm">{payment.vnpResponseCode}</p>
              </div>
            )}

            {payment.currency && (
              <div>
                <p className="mb-2 text-gray-500 text-sm">Loại tiền tệ</p>
                <p className="font-semibold">{payment.currency}</p>
              </div>
            )}

            {payment.subscription && (
              <div>
                <p className="mb-2 text-gray-500 text-sm">Gói đăng ký</p>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="font-semibold">{payment.subscription.name}</p>
                  <p className="text-gray-600 text-sm">
                    Giá: {payment.subscription.price.toLocaleString("vi-VN")}{" "}
                    VNĐ
                  </p>
                  <p className="text-gray-600 text-sm">
                    Loại:{" "}
                    {payment.subscription.type === 1 ? "Premium" : "Standard"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </AdminContentCard>
      </div>
    </AdminPageLayout>
  );
};
