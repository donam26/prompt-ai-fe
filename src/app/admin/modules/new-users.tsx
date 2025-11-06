"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAdminUsersQuery } from "@/hooks/admin/useUser";
import { DEFAULT_PAGINATION } from "@/constants";
import { UserPlus } from "lucide-react";
import { USERS_CONSTANTS } from "@/constants/users";

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
    dateFrom: formatDate(oneMonthAgo),
    dateTo: formatDate(now),
  };
};

export const NewUsers = (): React.JSX.Element => {
  const router = useRouter();

  const dateRange = useMemo(() => getDateRangeLastMonth(), []);

  const filters = useMemo(
    () => ({
      ...USERS_CONSTANTS.INITIAL_FILTERS,
      ...dateRange,
    }),
    [dateRange]
  );

  const pagination = useMemo(
    () => ({ ...DEFAULT_PAGINATION, pageSize: 5 }),
    []
  );

  const { usersWithPagination, isFetching } = useAdminUsersQuery({
    pagination,
    filters,
  });

  const totalCount = useMemo(
    () => usersWithPagination?.total || 0,
    [usersWithPagination]
  );

  const handleClick = (): void => {
    router.push("/admin/users");
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
      aria-label="Xem tất cả người dùng"
      className="hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="bg-gradient-to-br from-green-50 dark:from-green-900/30 to-emerald-50 dark:to-emerald-900/30 shadow-sm hover:shadow-md p-6 border border-green-200 dark:border-green-700 rounded-xl transition-shadow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex justify-center items-center bg-green-500/20 rounded-2xl w-16 h-16">
              <UserPlus className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="mb-1 font-medium text-gray-600 dark:text-gray-400 text-xs uppercase tracking-wide">
                Người dùng mới (30 ngày)
              </p>
              <p className="font-bold text-gray-900 dark:text-gray-100 text-3xl">
                {isFetching ? "..." : totalCount.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
