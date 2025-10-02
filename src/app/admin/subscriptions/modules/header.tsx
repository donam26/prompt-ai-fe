"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { SubscriptionHeaderProps } from "@/types/admin/subscription";

export const SubscriptionHeader = ({
  onAddSubscription,
  filters,
  disabled = false,
  className = "",
}: SubscriptionHeaderProps): React.JSX.Element => {
  const hasActiveFilters = Boolean(filters.searchTerm);

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="space-y-1">
        <h1 className="font-semibold text-2xl tracking-tight">
          Quản lý gói đăng ký
        </h1>
        <p className="text-muted-foreground">
          Quản lý các gói đăng ký và subscription trong hệ thống
          {hasActiveFilters && " (có bộ lọc đang áp dụng)"}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          onClick={onAddSubscription}
          disabled={disabled}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Thêm gói mới
        </Button>
      </div>
    </div>
  );
};
