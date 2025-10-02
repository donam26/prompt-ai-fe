"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Props } from "@/types/admin/role";

export const RoleHeader = ({ onAddRole }: Props): React.JSX.Element => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">Quản lý vai trò</h1>
        <p className="text-muted-foreground">
          Quản lý các vai trò và quyền hạn trong hệ thống
        </p>
      </div>
      <Button onClick={onAddRole} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Thêm vai trò
      </Button>
    </div>
  );
};
