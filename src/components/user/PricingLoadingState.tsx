"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface PricingLoadingStateProps {
  readonly isLoading: boolean;
  readonly error: string;
  readonly onRetry: () => void;
}

export const PricingLoadingState = ({
  isLoading,
  error,
  onRetry,
}: PricingLoadingStateProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center py-16">
        <div className="mb-4 border-4 border-purple-200 border-t-purple-600 rounded-full w-16 h-16 animate-spin"></div>
        <p className="text-gray-600 text-lg">Đang tải dữ liệu gói dịch vụ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center py-16 text-center">
        <div className="bg-red-50 mb-4 p-4 rounded-full">
          <RefreshCw className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="mb-2 font-semibold text-gray-900 text-xl">
          Không thể tải dữ liệu
        </h3>
        <p className="mb-6 max-w-md text-gray-600">{error}</p>
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Thử lại
        </Button>
      </div>
    );
  }

  return null;
};
