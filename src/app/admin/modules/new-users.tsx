"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import { useAdminUsersQuery } from "@/hooks/admin/useUser";
import Image from "next/image";
import { DEFAULT_PAGINATION } from "@/constants";
import type { User } from "@/types";
import { Mail, Clock, ArrowRight, UserPlus } from "lucide-react";
import { USERS_CONSTANTS } from "@/constants/users";

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

interface UserItemProps {
  readonly user: User;
  readonly onView: (user: User) => void;
}

const UserItem = ({ user, onView }: UserItemProps): React.JSX.Element => {
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div
      className="group flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg transition-colors cursor-pointer"
      onClick={() => onView(user)}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView(user);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Xem chi tiết người dùng ${user.email}`}
    >
      <div className="flex flex-1 items-center gap-4 min-w-0">
        <div className="flex flex-shrink-0 justify-center items-center bg-primary/10 rounded-full w-10 h-10">
          {user.profileImage || user.avatar ? (
            <Image
              src={user.profileImage || user.avatar || ""}
              alt={user.fullName || user.email}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="font-semibold text-primary text-sm">
              {getInitials(user.fullName || user.email)}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
              {user.fullName || "Chưa có tên"}
            </p>
          </div>
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-xs">
            <span className="flex items-center gap-1 truncate">
              <Mail className="flex-shrink-0 w-3 h-3" />
              <span className="truncate">{user.email}</span>
            </span>
            {user.createdAt && (
              <span className="flex flex-shrink-0 items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(user.createdAt)}
              </span>
            )}
          </div>
        </div>
      </div>
      <ArrowRight className="flex-shrink-0 ml-2 w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
    </div>
  );
};

export const NewUsers = (): React.JSX.Element => {
  const router = useRouter();

  const { usersWithPagination, isFetching } = useAdminUsersQuery({
    pagination: { ...DEFAULT_PAGINATION, pageSize: 5 },
    filters: USERS_CONSTANTS.INITIAL_FILTERS,
  });

  const newUsers = useMemo(
    () => usersWithPagination?.data || [],
    [usersWithPagination]
  );

  const handleViewUser = (user: User): void => {
    router.push(USERS_CONSTANTS.ROUTES.USER_EDIT(user.id));
  };

  const handleViewAll = (): void => {
    router.push("/admin/users");
  };

  return (
    <AdminContentCard
      title="Người dùng mới đăng ký"
      description="Danh sách các tài khoản người dùng mới nhất"
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
        ) : newUsers.length === 0 ? (
          <div className="py-8 text-gray-500 dark:text-gray-400 text-center">
            <UserPlus className="mx-auto mb-3 w-12 h-12 text-gray-300" />
            <p className="text-sm">Chưa có người dùng mới</p>
          </div>
        ) : (
          <div className="space-y-3">
            {newUsers.map(user => (
              <UserItem key={user.id} user={user} onView={handleViewUser} />
            ))}
          </div>
        )}

        {newUsers.length > 0 && (
          <button
            onClick={handleViewAll}
            className="flex justify-center items-center gap-2 mt-4 py-2 w-full font-medium text-primary hover:text-primary/80 text-sm transition-colors"
            aria-label="Xem tất cả người dùng"
          >
            Xem tất cả người dùng
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </AdminContentCard>
  );
};
