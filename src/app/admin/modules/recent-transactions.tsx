"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import { Badge } from "@/components/ui/badge";
import { usePayments } from "@/hooks/admin/usePayment";
import { DEFAULT_PAGINATION } from "@/constants";
import { getPaymentStatusConfig } from "@/constants/payment-status";
import type { Payment } from "@/types";
import { CreditCard, DollarSign, Clock, ArrowRight } from "lucide-react";
import { PAYMENTS_CONSTANTS } from "@/constants/payments";

const formatAmount = (amount: number): string => {
  if (!amount || amount === 0) return "0 VNĐ";
  const integerAmount = Math.round(amount);
  return `${integerAmount.toLocaleString("vi-VN")} VNĐ`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} phút trước`;
  }
  if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  }
  if (diffDays < 7) {
    return `${diffDays} ngày trước`;
  }
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

interface TransactionItemProps {
  readonly payment: Payment;
  readonly onView: (payment: Payment) => void;
}

const TransactionItem = ({
  payment,
  onView,
}: TransactionItemProps): React.JSX.Element => {
  const statusConfig = getPaymentStatusConfig(payment.paymentStatus);

  const getStatusColor = (): string => {
    if (statusConfig.color === "green") {
      return "bg-green-50 text-green-700 border-green-200";
    }
    if (statusConfig.color === "yellow") {
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
    return "bg-red-50 text-red-700 border-red-200";
  };

  return (
    <div
      className="group flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors cursor-pointer"
      onClick={() => onView(payment)}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView(payment);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Xem chi tiết giao dịch ${payment.id}`}
    >
      <div className="flex flex-1 items-center gap-4 min-w-0">
        <div className="flex flex-shrink-0 justify-center items-center bg-primary/10 rounded-full w-10 h-10">
          <CreditCard className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
              {payment.user?.fullName || payment.user?.email || "Khách hàng"}
            </p>
            <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
              {statusConfig.label}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-xs">
            <span className="flex items-center gap-1">
              <DollarSign className="w-3 h-3" />
              {formatAmount(payment.amount)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(payment.paymentDate || payment.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <ArrowRight className="flex-shrink-0 ml-2 w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
    </div>
  );
};

export const RecentTransactions = (): React.JSX.Element => {
  const router = useRouter();

  const { paymentsWithPagination, isFetching } = usePayments({
    pagination: { ...DEFAULT_PAGINATION, pageSize: 5 },
    filters: PAYMENTS_CONSTANTS.INITIAL_FILTERS,
  });

  const recentPayments = useMemo(
    () => paymentsWithPagination?.data || [],
    [paymentsWithPagination]
  );

  const handleViewPayment = (payment: Payment): void => {
    router.push(PAYMENTS_CONSTANTS.ROUTES.PAYMENT_VIEW(payment.id));
  };

  const handleViewAll = (): void => {
    router.push("/admin/payments");
  };

  return (
    <AdminContentCard
      title="Giao dịch gần nhất"
      description="Danh sách các giao dịch thanh toán mới nhất"
      padding="lg"
    >
      <div className="space-y-4">
        {isFetching ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 dark:bg-gray-700 rounded-lg h-20 animate-pulse"
              />
            ))}
          </div>
        ) : recentPayments.length === 0 ? (
          <div className="py-8 text-gray-500 dark:text-gray-400 text-center">
            <CreditCard className="mx-auto mb-3 w-12 h-12 text-gray-300" />
            <p className="text-sm">Chưa có giao dịch nào</p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentPayments.map(payment => (
              <TransactionItem
                key={payment.id}
                payment={payment}
                onView={handleViewPayment}
              />
            ))}
          </div>
        )}

        {recentPayments.length > 0 && (
          <button
            onClick={handleViewAll}
            className="flex justify-center items-center gap-2 mt-4 py-2 w-full font-medium text-primary hover:text-primary/80 text-sm transition-colors"
            aria-label="Xem tất cả giao dịch"
          >
            Xem tất cả giao dịch
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </AdminContentCard>
  );
};
