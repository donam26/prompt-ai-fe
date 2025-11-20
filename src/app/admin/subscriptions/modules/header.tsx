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
    <div
      className={`flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4 ${className}`}
    >
      <div className="space-y-1 sm:text-left text-center">
        <h1 className="font-semibold text-2xl sm:text-3xl tracking-tight">
          Quản lý gói đăng ký
        </h1>
        <p className="text-muted-foreground">
          Quản lý các gói đăng ký và subscription trong hệ thống
          {hasActiveFilters && " (có bộ lọc đang áp dụng)"}
        </p>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button
          onClick={onAddSubscription}
          disabled={disabled}
          className="flex justify-center items-center gap-2 w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          Thêm gói mới
        </Button>
      </div>
    </div>
  );
};
