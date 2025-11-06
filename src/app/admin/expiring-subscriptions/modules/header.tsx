"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExportExpiringSubscriptions } from "@/hooks/admin/useUser/useExportExpiringSubscriptions";
import type { ExpiringSubscriptionsFilterState } from "@/types/admin/expiring-subscriptions";

interface ExpiringSubscriptionsHeaderProps {
  filters: ExpiringSubscriptionsFilterState;
}

/**
 * Expiring subscriptions page header component
 *
 * @param props - The component props
 * @returns The header JSX
 */
export const ExpiringSubscriptionsHeader = ({
  filters,
}: ExpiringSubscriptionsHeaderProps): React.JSX.Element => {
  const { mutate: handleExport, isLoading: isExporting } =
    useExportExpiringSubscriptions();

  const handleExportClick = async (): Promise<void> => {
    await handleExport({
      search: filters.search || undefined,
      days: filters.days,
      subscriptionType: filters.subscriptionType,
    });
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="font-bold text-gray-900 text-3xl">
          Danh sách user sắp hết hạn gói
        </h1>
        <p className="mt-2 text-gray-600">
          Danh sách người dùng có gói đăng ký sắp hết hạn
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          onClick={handleExportClick}
          variant="outline"
          disabled={isExporting}
          className="hover:bg-green-50 border-green-600 text-green-600"
        >
          <Download className="mr-2 w-4 h-4" />
          {isExporting ? "Đang export..." : "Export Excel"}
        </Button>
      </div>
    </div>
  );
};
