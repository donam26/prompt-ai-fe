import React from "react";
import { User } from "lucide-react";

import { Column } from "@/components/data-table/data-table";
import {
  ImageCell,
  StatusCell,
  BadgeCell,
  ActionsCell,
} from "@/components/table-cell";
import type { User as UserType } from "@/lib/types";
import type { UserColumnHandlers } from "@/types/admin";

/**
 * Base user columns configuration with responsive widths
 */
export const userColumns: Column<UserType>[] = [
  {
    key: "avatar",
    title: "Ảnh đại diện",
    width: 80,
    align: "center",
    className: "hidden sm:table-cell",
    render: (_, user) => (
      <ImageCell
        src={user.avatar || user.image}
        alt={user.name || user.fullName || "User"}
        size="sm"
      />
    ),
  },
  {
    key: "name",
    title: "Tên người dùng",
    dataIndex: "name",
    className: "font-semibold text-gray-900 min-w-[200px] max-w-[280px]",
    render: (_, user) => (
      <div className="flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <span
            className="font-semibold text-gray-900 truncate"
            title={user.name || user.fullName || "Unknown User"}
          >
            {user.name || user.fullName || "Unknown User"}
          </span>
          {user.isVerified && <BadgeCell label="Verified" variant="success" />}
        </div>
        <span
          className="max-w-[240px] text-gray-500 text-sm truncate"
          title={user.email}
        >
          {user.email}
        </span>
        {user.phone && (
          <span
            className="max-w-[240px] text-gray-400 text-xs truncate"
            title={user.phone}
          >
            {user.phone}
          </span>
        )}
      </div>
    ),
  },
  {
    key: "role",
    title: "Vai trò",
    width: 120,
    className: "hidden md:table-cell",
    render: (_, user) => (
      <BadgeCell
        label={user.role || "User"}
        variant={user.role === "admin" ? "destructive" : "secondary"}
        maxWidth="max-w-[100px]"
      />
    ),
  },
  {
    key: "status",
    title: "Trạng thái",
    width: 120,
    align: "center",
    className: "min-w-[100px]",
    render: (_, user) => (
      <StatusCell
        isActive={user.status === "active" || user.isActive}
        isComingSoon={user.status === "suspended"}
      />
    ),
  },
  {
    key: "createdAt",
    title: "Ngày tạo",
    width: 140,
    className: "hidden lg:table-cell",
    render: (_, user) => (
      <span className="text-gray-600 text-sm">
        {user.createdAt
          ? new Date(user.createdAt).toLocaleDateString("vi-VN")
          : "N/A"}
      </span>
    ),
  },
  {
    key: "actions",
    title: "Thao tác",
    width: 140,
    align: "center",
    className: "min-w-[120px]",
    render: (_, user, index, context) => {
      const handlers = (context as UserColumnHandlers) || {};
      return (
        <ActionsCell
          item={user}
          onEdit={handlers.onEdit}
          onDelete={item => handlers.onDelete?.(item.id)}
          onView={handlers.onView}
        />
      );
    },
  },
];

/**
 * Creates user columns with custom handlers
 *
 * @param handlers - The column handlers
 * @returns The configured user columns
 */
export const createUserColumns = (
  handlers: UserColumnHandlers
): Column<UserType>[] => {
  return userColumns.map(column => {
    if (column.key === "actions") {
      return {
        ...column,
        render: (value, user, index) =>
          column.render?.(value, user, index, handlers),
      };
    }
    return column;
  });
};
