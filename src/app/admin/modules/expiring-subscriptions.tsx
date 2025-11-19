"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useExpiringSubscriptions } from "@/hooks/admin/useUser/useExpiringSubscriptions";
import { DEFAULT_PAGINATION } from "@/constants";
import { AlertTriangle } from "lucide-react";

export const ExpiringSubscriptions = (): React.JSX.Element => {
  const router = useRouter();

  const { usersWithPagination, isFetching } = useExpiringSubscriptions({
    days: 5,
    pagination: { ...DEFAULT_PAGINATION, pageSize: 5 },
  });

  const totalCount = useMemo(
    () => usersWithPagination?.total || 0,
    [usersWithPagination]
  );

  const handleClick = (): void => {
    router.push("/admin/expiring-subscriptions");
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label="Xem danh sách người dùng sắp hết hạn"
      className="hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="bg-gradient-to-br from-orange-50 dark:from-orange-900/30 to-red-50 dark:to-red-900/30 shadow-sm hover:shadow-md p-6 border border-orange-200 dark:border-orange-700 rounded-xl transition-shadow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex justify-center items-center bg-orange-500/20 rounded-xl sm:rounded-2xl w-12 h-12 sm:w-16 sm:h-16 shrink-0">
              <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">
                Người dùng có gói sắp hết hạn (5 ngày)
              </p>
              <p className="font-bold text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl">
                {isFetching ? "..." : totalCount.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
