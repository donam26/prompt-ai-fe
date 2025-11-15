"use client";

import React from "react";
import { CheckCircle2, XCircle, Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface BulkActionsProps {
  selectedCount: number;
  selectedSubType: string;
  onSubTypeChange: (value: string) => void;
  onApplySubType: () => void;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  isLoading?: boolean;
  isBulkDeleting?: boolean;
  disabled?: boolean;
}

export const BulkActions = ({
  selectedCount,
  selectedSubType,
  onSubTypeChange,
  onApplySubType,
  onClearSelection,
  onBulkDelete,
  isLoading = false,
  isBulkDeleting = false,
  disabled = false,
}: BulkActionsProps): React.JSX.Element => {
  const hasSelection = selectedCount > 0;
  const isBusy = isLoading || isBulkDeleting;

  return (
    <div className="transition-all duration-300 ease-in-out">
      <div
        className={cn(
          "bg-gradient-to-r from-blue-50 dark:from-blue-900/20 to-indigo-50 dark:to-indigo-900/20 shadow-sm p-4 border border-blue-200 dark:border-blue-800 rounded-xl",
          !hasSelection && "opacity-60"
        )}
      >
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3">
          {/* Selection Info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="font-medium text-blue-900 dark:text-blue-100 text-sm whitespace-nowrap">
                {hasSelection ? "Đã chọn" : "Chưa chọn"}
              </span>
              <Badge
                variant="secondary"
                className={cn(
                  "flex-shrink-0 border-blue-200 dark:border-blue-700",
                  hasSelection
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                )}
              >
                {hasSelection
                  ? `${selectedCount} prompt${selectedCount > 1 ? "s" : ""}`
                  : "0 prompts"}
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex sm:flex-row flex-col flex-wrap sm:items-center gap-2 sm:gap-2 w-full sm:w-auto">
            {/* SubType Selector */}
            <div className="flex items-center gap-2 w-full sm:w-auto sm:min-w-[140px]">
              <Settings className="flex-shrink-0 w-4 h-4 text-gray-500 dark:text-gray-400" />
              <Select
                value={selectedSubType}
                onValueChange={onSubTypeChange}
                disabled={disabled || isLoading || !hasSelection}
              >
                <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 w-full sm:w-[140px] h-9">
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-500 rounded-full w-2 h-2"></div>
                      <span>Free</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="premium">
                    <div className="flex items-center gap-2">
                      <div className="bg-yellow-500 rounded-full w-2 h-2"></div>
                      <span>Premium</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Apply Button */}
            <Button
              onClick={onApplySubType}
              disabled={disabled || isBusy || !selectedSubType || !hasSelection}
              className="justify-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 disabled:opacity-50 px-4 w-full sm:w-auto sm:min-w-[100px] h-9 font-medium text-white text-sm transition-all duration-200 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                "Áp dụng"
              )}
            </Button>

            {/* Bulk Delete */}
            <Button
              onClick={onBulkDelete}
              disabled={disabled || isBusy || !hasSelection}
              variant="destructive"
              className="flex justify-center items-center gap-2 disabled:opacity-50 px-4 w-full sm:w-auto sm:min-w-[130px] h-9 text-sm disabled:cursor-not-allowed"
            >
              {isBulkDeleting ? (
                <>
                  <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin"></div>
                  <span>Đang xóa...</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Xóa đã chọn</span>
                </>
              )}
            </Button>

            {/* Clear Selection */}
            <Button
              onClick={onClearSelection}
              disabled={disabled || isBusy || !hasSelection}
              variant="ghost"
              className="justify-center hover:bg-gray-100 dark:hover:bg-gray-700 px-3 w-full sm:w-auto h-9 text-gray-600 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400 transition-all duration-200"
            >
              <XCircle className="mr-1 w-4 h-4" />
              Bỏ chọn
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {isBusy && (
          <div className="mt-3">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full w-full h-1.5">
              <div
                className="bg-blue-600 rounded-full h-1.5 animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
