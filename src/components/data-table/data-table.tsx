import * as React from "react";
import { Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pagination } from "./pagination";
import { cn } from "@/lib/utils";

export interface Column<T> {
  readonly key: string;
  readonly title: string;
  readonly dataIndex?: keyof T;
  readonly render?: (
    value: unknown,
    record: T,
    index: number,
    context?: unknown
  ) => React.ReactNode;
  readonly width?: string | number;
  readonly align?: "left" | "center" | "right";
  readonly className?: string;
  readonly sortable?: boolean;
  readonly filterable?: boolean;
}

export interface PaginationConfig {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly totalItems?: number;
  readonly pageSize?: number;
  readonly onPaginationChange?: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  readonly onPageChange?: (page: number) => void;
  readonly onPageSizeChange?: (pageSize: number) => void;
  readonly showPrevNext?: boolean;
  readonly maxVisiblePages?: number;
  readonly compact?: boolean;
}

export interface DataTableProps<T> {
  readonly data: T[];
  readonly columns: Column<T>[];
  readonly loading?: boolean;
  readonly emptyText?: string;
  readonly className?: string;
  readonly pagination?: PaginationConfig;
  readonly rowKey?: keyof T | ((record: T) => string | number);
  readonly onRowClick?: (record: T, index: number) => void;
  readonly rowClassName?: string | ((record: T, index: number) => string);
  readonly context?: unknown;
  readonly striped?: boolean;
  readonly hoverable?: boolean;
  readonly bordered?: boolean;
  // Direct pagination props
  readonly pageCount?: number;
  readonly pageIndex?: number;
  readonly pageSize?: number;
  readonly totalItems?: number;
  readonly onPaginationChangeAction?: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
}

export const DataTable = <T = Record<string, unknown>,>({
  data,
  columns,
  loading = false,
  emptyText = "Không có dữ liệu",
  className,
  pagination,
  rowKey = "id" as keyof T,
  onRowClick,
  rowClassName,
  context,
  striped = false,
  hoverable = true,
  bordered = true,
  // Direct pagination props
  pageCount,
  pageIndex,
  pageSize,
  totalItems,
  onPaginationChangeAction,
}: DataTableProps<T>) => {
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === "function") {
      return rowKey(record);
    }
    return (record[rowKey] as string | number) || index;
  };

  const getRowClassName = (record: T, index: number): string => {
    const baseClasses = [
      "transition-colors duration-200",
      striped && index % 2 === 1 && "bg-gray-50/50 dark:bg-gray-800/50",
      hoverable && "hover:bg-gray-100 dark:hover:bg-gray-700",
      onRowClick && "cursor-pointer",
    ].filter(Boolean);

    const customClass =
      typeof rowClassName === "function"
        ? rowClassName(record, index)
        : rowClassName;

    return cn(baseClasses, customClass);
  };

  const getTableClassName = (): string => {
    return cn(
      "w-full",
      bordered &&
        "border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden",
      "bg-white dark:bg-gray-800"
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center space-y-4 py-12">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="text-gray-600 dark:text-gray-400 text-sm">
          Đang tải dữ liệu...
        </span>
      </div>
    );
  }

  return (
    <div className={cn("data-table-container space-y-4", className)}>
      {/* Mobile: Horizontal scroll wrapper */}
      <div className="-mx-4 sm:mx-0 overflow-x-auto">
        <div className={cn("inline-block min-w-full", getTableClassName())}>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 border-b">
                {columns.map(column => (
                  <TableHead
                    key={column.key}
                    style={{ width: column.width, minWidth: column.width }}
                    className={cn(
                      "px-3 sm:px-4 py-2 sm:py-3 font-semibold text-gray-700 dark:text-gray-200 text-xs sm:text-sm whitespace-nowrap",
                      "border-r border-gray-200 dark:border-gray-700 last:border-r-0",
                      column.align === "center" && "text-center",
                      column.align === "right" && "text-right",
                      column.sortable &&
                        "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800",
                      column.className
                    )}
                  >
                    {column.title}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-gray-500 dark:text-gray-400 text-center"
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="font-medium text-lg">{emptyText}</div>
                      <div className="text-gray-400 text-sm">
                        Không có dữ liệu để hiển thị
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((record, index) => (
                  <TableRow
                    key={getRowKey(record, index)}
                    onClick={() => onRowClick?.(record, index)}
                    className={getRowClassName(record, index)}
                  >
                    {columns.map(column => {
                      const value = column.dataIndex
                        ? record[column.dataIndex]
                        : record[column.key as keyof T];

                      return (
                        <TableCell
                          key={column.key}
                          className={cn(
                            "px-3 sm:px-4 py-2 sm:py-3 text-gray-800 dark:text-gray-200 text-xs sm:text-sm",
                            "border-r border-gray-200 dark:border-gray-700 last:border-r-0",
                            column.align === "center" && "text-center",
                            column.align === "right" && "text-right",
                            // Allow text wrapping on mobile for better readability
                            "break-words sm:whitespace-nowrap",
                            column.className
                          )}
                        >
                          {column.render
                            ? column.render(value, record, index, context)
                            : String(value || "")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {(pagination || (pageCount && pageIndex !== undefined && pageSize)) && (
        <div className="bg-white dark:bg-gray-800 px-2 sm:px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg w-full min-w-0 overflow-x-auto">
          <Pagination
            currentPage={
              pagination ? pagination.currentPage : (pageIndex || 0) + 1
            }
            totalPages={pagination ? pagination.totalPages : pageCount || 1}
            totalItems={pagination ? pagination.totalItems : totalItems}
            pageSize={pagination ? pagination.pageSize : pageSize || 10}
            onPaginationChange={
              pagination
                ? pagination.onPaginationChange
                : onPaginationChangeAction
            }
            onPageChange={pagination?.onPageChange}
            onPageSizeChange={pagination?.onPageSizeChange}
            showPrevNext={pagination?.showPrevNext ?? true}
            maxVisiblePages={pagination?.maxVisiblePages ?? 5}
            compact={pagination?.compact ?? false}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
};
