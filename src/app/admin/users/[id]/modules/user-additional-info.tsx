"use client";

import type { User } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  readonly user: User;
}

export function UserAdditionalInfo({ user }: Props): React.JSX.Element {
  // Normalize permissions to array format
  const permissionArray = (() => {
    if (!user.permissions) return [];
    if (Array.isArray(user.permissions)) {
      return user.permissions;
    }
    if (typeof user.permissions === "object" && user.permissions !== null) {
      // Handle object format: { "permission": true, ... }
      return Object.keys(user.permissions).filter(
        key => (user.permissions as Record<string, boolean>)[key] === true
      );
    }
    if (typeof user.permissions === "string") {
      return [user.permissions];
    }
    return [];
  })();

  return (
    <div className="space-y-4">
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        {/* User ID */}
        <div className="space-y-2">
          <Label className="font-medium text-sm">ID người dùng</Label>
          <Input value={user.id || ""} disabled className="bg-gray-50 w-full" />
        </div>
      </div>

      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
        {/* Created At */}
        <div className="space-y-2">
          <Label className="font-medium text-sm">Ngày tạo</Label>
          <Input
            value={
              user.createdAt
                ? new Date(user.createdAt).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })
                : ""
            }
            disabled
            className="bg-gray-50 w-full"
          />
        </div>

        {/* Updated At */}
        <div className="space-y-2">
          <Label className="font-medium text-sm">Ngày cập nhật</Label>
          <Input
            value={
              user.updatedAt
                ? new Date(user.updatedAt).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })
                : ""
            }
            disabled
            className="bg-gray-50 w-full"
          />
        </div>
      </div>

      {/* Permissions */}
      {permissionArray.length > 0 && (
        <div className="space-y-2">
          <Label className="font-medium text-sm">Quyền hạn</Label>
          <div className="flex flex-wrap gap-2">
            {permissionArray.map((permission: string) => (
              <span
                key={permission}
                className="bg-blue-100 px-2 py-1 rounded-md text-blue-800 text-xs"
              >
                {permission}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
