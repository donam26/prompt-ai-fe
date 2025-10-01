import type { ColumnDef } from "@tanstack/react-table";
import type { Industry, Prompt } from "@/types";
import { Column } from "@/components/data-table/data-table";
import { BadgeCell, BadgeList, ActionsCell } from "@/components/table-cell";
import { getBadgeVariantByIndustry, BADGE_CONSTANTS } from "@/constants/badges";

interface Props {
  onEditAction: (prompt: Prompt) => void;
  onDeleteAction: (prompt: Prompt) => void;
}

export function usePromptColumns({
  onEditAction,
  onDeleteAction,
}: Props): ColumnDef<Prompt>[] {
  return [
    {
      accessorKey: "title",
      meta: { title: "Tiêu đề" },
      header: () => <div className="font-medium">Tiêu đề</div>,
      cell: ({ row }) => (
        <div className="flex flex-col space-y-1 min-w-[200px] max-w-[300px]">
          <div className="flex items-center gap-2">
            <span
              className="font-semibold text-gray-900 truncate"
              title={row.original.title}
            >
              {row.original.title}
            </span>
            {row.original.isType == "2" ? (
              <BadgeCell label="Premium" variant="premium" />
            ) : row.original.isType == "1" ? (
              <BadgeCell label="Free" variant="secondary" />
            ) : null}
          </div>
          {(row.original.shortDescription || row.original.description) && (
            <div
              className="max-w-[280px] text-gray-500 text-sm line-clamp-2 prose prose-sm"
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
            label={
              row.original.category?.name ||
              row.original.category?.name ||
              "Chưa phân loại"
            }
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
      header: () => (
        <div className="hidden lg:block font-medium">Ngành nghề</div>
      ),
      cell: ({ row }) => (
        <div className="hidden lg:block">
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
              maxVisible={BADGE_CONSTANTS.LIST_CONFIG.TABLE_MAX_VISIBLE}
              badgeClassName="max-w-[80px]"
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
      header: () => <div className="hidden lg:block font-medium">Ngày tạo</div>,
      cell: ({ row }) => (
        <div className="hidden lg:block">
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
export const createPromptColumns = (handlers: Props): ColumnDef<Prompt>[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return usePromptColumns(handlers);
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

    return {
      key: accessorKey || id || "",
      title,
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
      width: 200,
      align: "left" as const,
      className: "",
    };
  });
};
