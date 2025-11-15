import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import type { Industry, Prompt } from "@/types";
import { Column } from "@/components/data-table/data-table";
import { BadgeCell, BadgeList, ActionsCell } from "@/components/table-cell";
import { getBadgeVariantByIndustry } from "@/constants/badges";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  onEditAction: (prompt: Prompt) => void;
  onDeleteAction: (prompt: Prompt) => void;
  selectedRows?: Set<string>;
  onSelectRow?: (rowId: string, checked: boolean) => void;
  onSelectAll?: (checked: boolean) => void;
}

export function usePromptColumns({
  onEditAction,
  onDeleteAction,
  selectedRows = new Set(),
  onSelectRow,
  onSelectAll,
  allRowIds = [],
}: Props & { allRowIds?: string[] }): ColumnDef<Prompt>[] {
  const visibleRowIds = allRowIds;
  const allVisibleSelected =
    visibleRowIds.length > 0 && visibleRowIds.every(id => selectedRows.has(id));
  const someVisibleSelected = visibleRowIds.some(id => selectedRows.has(id));

  return [
    // Selection column
    {
      id: "select",
      meta: { title: "" },
      header: () => (
        <div className="flex justify-center items-center pr-4">
          <Checkbox
            checked={
              someVisibleSelected && !allVisibleSelected
                ? "indeterminate"
                : allVisibleSelected
            }
            aria-label="Select all"
            onCheckedChange={checked => onSelectAll?.(checked === true)}
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center pr-4">
          <Checkbox
            checked={selectedRows.has(row.original.id)}
            onCheckedChange={checked =>
              onSelectRow?.(row.original.id, checked === true)
            }
            aria-label={`Select row ${row.original.id}`}
          />
        </div>
      ),
      enableSorting: false,
      size: 60,
    },
    {
      accessorKey: "id",
      meta: { title: "ID" },
      header: () => <div className="font-medium">ID</div>,
      cell: ({ row }) => (
        <div className="font-mono text-gray-600 text-sm">
          #{row.original.id}
        </div>
      ),
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: "title",
      meta: { title: "Tiêu đề" },
      header: () => <div className="font-medium">Tiêu đề</div>,
      cell: ({ row }) => (
        <div className="flex flex-col space-y-1 min-w-[200px] max-w-[300px]">
          <div className="flex items-start gap-2">
            <span
              className="flex-1 font-semibold text-gray-900 line-clamp-2"
              title={row.original.title}
            >
              {row.original.title}
            </span>
            {row.original.subType === 2 ? (
              <BadgeCell label="Premium" variant="premium" />
            ) : row.original.subType === 1 ? (
              <BadgeCell label="Free" variant="secondary" />
            ) : null}
          </div>
          {(row.original.shortDescription || row.original.description) && (
            <div
              className="max-w-[300px] text-gray-500 text-sm line-clamp-2 prose prose-sm"
              title={row.original.shortDescription || row.original.description}
              dangerouslySetInnerHTML={{
                __html:
                  row.original.shortDescription ||
                  row.original.description ||
                  "",
              }}
            />
          )}
          {row.original.tags && row.original.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {row.original.tags.length > 3 && (
                <span className="text-gray-400 text-xs">
                  +{row.original.tags.length - 3} khác
                </span>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "category",
      meta: { title: "Danh mục" },
      header: () => <div className="hidden md:block font-medium">Danh mục</div>,
      cell: ({ row }) => (
        <div className="hidden md:block">
          <BadgeCell
            label={row.original.category?.name || "Chưa phân loại"}
            variant="section"
            maxWidth="max-w-[100px]"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "industries",
      meta: { title: "Ngành nghề" },
      header: () => <div className="font-medium">Ngành nghề</div>,
      cell: ({ row }) => (
        <div>
          {row.original.promptIndustries &&
          row.original.promptIndustries.length > 0 ? (
            <BadgeList
              items={row.original.promptIndustries.map(
                (industry: Industry) => ({
                  id: industry.id,
                  label: industry.name,
                  variant: getBadgeVariantByIndustry(industry.name),
                })
              )}
              maxVisible={3}
            />
          ) : (
            <span className="text-gray-400 text-sm">Chưa có</span>
          )}
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      meta: { title: "Ngày tạo" },
      header: () => <div className="font-medium">Ngày tạo</div>,
      cell: ({ row }) => (
        <div>
          <span className="text-gray-600 text-sm">
            {row.original.createdAt
              ? new Date(row.original.createdAt).toLocaleDateString("vi-VN")
              : "N/A"}
          </span>
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "actions",
      meta: { title: "Thao tác" },
      header: () => <div className="font-medium text-center">Thao tác</div>,
      cell: ({ row }) => (
        <div className="flex items-center gap-1 min-w-[100px]">
          <ActionsCell
            item={row.original}
            onEdit={onEditAction}
            onDelete={onDeleteAction}
          />
        </div>
      ),
      enableSorting: false,
    },
  ];
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use usePromptColumns instead
 */
export const createPromptColumns = (
  handlers: Partial<Props>
): ColumnDef<Prompt>[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return usePromptColumns(handlers as Props);
};

/**
 * Adapter function to convert TanStack Table columns to custom DataTable columns
 */
export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<Prompt>[]
): Column<Prompt>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";
    const size = (col as any)?.size;
    const isSelectColumn = id === "select";

    // Render header for select column
    let headerContent = title;
    if (col.header && typeof col.header === "function") {
      try {
        const headerResult = (col.header as any)({
          column: col,
          header: col.header,
          table: {},
        });
        if (React.isValidElement(headerResult)) {
          headerContent = headerResult;
        }
      } catch {
        // Fallback to title
      }
    }

    return {
      key: accessorKey || id || "",
      title: headerContent,
      render: (_: unknown, record: Prompt, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Prompt] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Prompt] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Prompt] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Prompt] : "";
      },
      width: size || 200,
      align: isSelectColumn ? ("center" as const) : ("left" as const),
      className: "",
    };
  });
};
