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
    onPageChange: (page: number) => void;
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
    const baseClass = "hover:bg-muted/50 cursor-pointer";
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
    <div className={cn("space-y-4", className)}>
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead
                  key={column.key}
                  style={{ width: column.width }}
                  className={cn(
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
                  className="py-8 text-muted-foreground text-center"
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
                    onRowClick ? getRowClassName(record, index) : undefined
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
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
          showPrevNext={pagination.showPrevNext}
          maxVisiblePages={pagination.maxVisiblePages}
        />
      )}
    </div>
  );
}
