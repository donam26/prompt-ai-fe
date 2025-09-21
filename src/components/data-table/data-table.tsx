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
  key: string;
  title: string;
  dataIndex?: keyof T;
  render?: (
    value: unknown,
    record: T,
    index: number,
    context?: unknown
  ) => React.ReactNode;
  width?: string | number;
  align?: "left" | "center" | "right";
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyText?: string;
  className?: string;
  // Pagination props
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems?: number;
    pageSize?: number;
    onPageChange: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    showPrevNext?: boolean;
    maxVisiblePages?: number;
  };
  // Row props
  rowKey?: keyof T | ((record: T) => string | number);
  onRowClick?: (record: T, index: number) => void;
  rowClassName?: string | ((record: T, index: number) => string);
  // Context for column render functions
  context?: unknown;
}

export function DataTable<T = Record<string, unknown>>({
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
}: DataTableProps<T>) {
  const getRowKey = (record: T, index: number): string | number => {
    if (typeof rowKey === "function") {
      return rowKey(record);
    }
    return (record[rowKey] as string | number) || index;
  };

  const getRowClassName = (record: T, index: number): string => {
    const baseClass =
      "group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors";
    const customClass =
      typeof rowClassName === "function"
        ? rowClassName(record, index)
        : rowClassName;
    return cn(baseClass, customClass);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="ml-2">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-900">
              {columns.map(column => (
                <TableHead
                  key={column.key}
                  style={{ width: column.width }}
                  className={cn(
                    "px-3 sm:px-6 py-4 font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base",
                    column.align === "center" && "text-center",
                    column.align === "right" && "text-right",
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
                  className="h-24 text-gray-500 dark:text-gray-400 text-lg text-center"
                >
                  {emptyText}
                </TableCell>
              </TableRow>
            ) : (
              data.map((record, index) => (
                <TableRow
                  key={getRowKey(record, index)}
                  onClick={() => onRowClick?.(record, index)}
                  className={
                    onRowClick
                      ? getRowClassName(record, index)
                      : "group hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  }
                >
                  {columns.map(column => {
                    const value = column.dataIndex
                      ? record[column.dataIndex]
                      : record[column.key as keyof T];

                    return (
                      <TableCell
                        key={column.key}
                        className={cn(
                          "px-3 sm:px-6 py-4 text-gray-800 dark:text-gray-200 text-sm sm:text-base",
                          column.align === "center" && "text-center",
                          column.align === "right" && "text-right",
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

      {pagination && (
        <div className="bg-white dark:bg-gray-800 px-4 py-4 border-gray-200 dark:border-gray-700 border-t rounded-b-xl">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            pageSize={pagination.pageSize}
            onPageChange={pagination.onPageChange}
            onPageSizeChange={pagination.onPageSizeChange}
            showPrevNext={pagination.showPrevNext}
            maxVisiblePages={pagination.maxVisiblePages}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
