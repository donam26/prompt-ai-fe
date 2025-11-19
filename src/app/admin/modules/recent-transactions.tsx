"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePayments } from "@/hooks/admin/usePayment";
import { DEFAULT_PAGINATION } from "@/constants";
import { CreditCard } from "lucide-react";
import { PAYMENTS_CONSTANTS } from "@/constants/payments";

const getDateRangeLastMonth = () => {
  const now = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(now.getMonth() - 1);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    from: formatDate(oneMonthAgo),
    to: formatDate(now),
  };
};

export const RecentTransactions = (): React.JSX.Element => {
  const router = useRouter();

  const dateRange = useMemo(() => getDateRangeLastMonth(), []);

  const filters = useMemo(
    () => ({
      ...PAYMENTS_CONSTANTS.INITIAL_FILTERS,
      dateRange,
    }),
    [dateRange]
  );

  const pagination = useMemo(
    () => ({ ...DEFAULT_PAGINATION, pageSize: 5 }),
    []
  );

  const { paymentsWithPagination, isFetching } = usePayments({
    pagination,
    filters,
  });

  const totalCount = useMemo(
    () => paymentsWithPagination?.total || 0,
    [paymentsWithPagination]
  );

  const handleClick = (): void => {
    router.push("/admin/payments");
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      aria-label="Xem tất cả giao dịch"
      className="w-full text-left hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="bg-gradient-to-br from-primary-50 dark:from-primary-900/30 to-primary-100 dark:to-primary-800/30 shadow-sm hover:shadow-md p-6 border border-primary-200 dark:border-primary-700 rounded-xl transition-shadow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex justify-center items-center bg-primary-500/20 rounded-xl sm:rounded-2xl w-12 sm:w-16 h-12 sm:h-16 shrink-0">
              <CreditCard className="w-6 sm:w-8 h-6 sm:h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="mb-1 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">
                Số lượng giao dịch (30 ngày)
              </p>
              <p className="font-bold text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl">
                {isFetching ? "..." : totalCount.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};
