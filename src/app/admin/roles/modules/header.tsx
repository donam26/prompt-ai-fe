"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Props } from "@/types/admin/role";

export const RoleHeader = ({ onAddRole }: Props): React.JSX.Element => {
  return (
    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4">
      <div className="sm:text-left text-center">
        <h1 className="font-bold text-2xl sm:text-3xl tracking-tight">
          Quản lý vai trò
        </h1>
        <p className="text-muted-foreground mt-1 sm:mt-2">
          Quản lý các vai trò và quyền hạn trong hệ thống
        </p>
      </div>
      <Button
        onClick={onAddRole}
        className="flex justify-center items-center gap-2 w-full sm:w-auto"
      >
        <Plus className="w-4 h-4" />
        Thêm vai trò
      </Button>
    </div>
  );
};
