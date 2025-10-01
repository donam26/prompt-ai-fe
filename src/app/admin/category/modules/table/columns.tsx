import type { ColumnDef } from "@tanstack/react-table";
import type { Category } from "@/types";
import { Column } from "@/components/data-table/data-table";
import {
  ImageCell,
  StatusCell,
  BadgeCell,
  IndustryTagsCell,
  ActionsCell,
} from "@/components/table-cell";
import { isValidValue } from "@/utils/common-helper";

interface Props {
  onEditAction: (category: Category) => void;
  onDeleteAction: (category: Category) => void;
}

export function useCategoryColumns({
  onEditAction,
  onDeleteAction,
}: Props): ColumnDef<Category>[] {
  return [
    {
      accessorKey: "image",
      meta: { title: "Hình ảnh" },
      header: () => (
        <div className="w-full font-medium text-center">Hình ảnh</div>
      ),
      cell: ({ row }) => (
        <div className="hidden sm:flex justify-center">
          <ImageCell
            src={row.original.image}
            alt={row.original.name}
            size="md"
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      meta: { title: "Tên danh mục" },
      header: () => <div className="font-medium">Tên danh mục</div>,
      cell: ({ row }) => (
        <div className="flex flex-col space-y-1 min-w-[200px] max-w-[280px]">
          <div className="flex items-center gap-2">
            <span
              className="font-semibold text-gray-900 truncate"
              title={row.original.name}
            >
              {row.original.name}
            </span>
            {row.original.type === "premium" && (
              <BadgeCell label="Premium" variant="premium" />
            )}
          </div>
          {isValidValue(row.original.description) &&
            row.original.description !== row.original.name && (
              <span
                className="max-w-[240px] text-gray-500 text-sm truncate"
                title={row.original.description}
              >
                {row.original.description}
              </span>
            )}
          <IndustryTagsCell
            industries={row.original.industries}
            maxVisible={3}
          />
        </div>
      ),
    },
    {
      accessorKey: "section",
      meta: { title: "Phân loại" },
      header: () => (
        <div className="hidden md:block font-medium">Phân loại</div>
      ),
      cell: ({ row }) => (
        <div className="hidden md:block">
          <BadgeCell
            label={
              row.original.Section?.name ||
              row.original.section?.name ||
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
      accessorKey: "status",
      meta: { title: "Trạng thái" },
      header: () => (
        <div className="w-full font-medium text-center">Trạng thái</div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center min-w-[120px]">
          <StatusCell
            isComingSoon={
              row.original.isCommingSoon || row.original.isCommingSoon
            }
            isActive={
              !row.original.isCommingSoon && !row.original.isCommingSoon
            }
          />
        </div>
      ),
      enableSorting: false,
    },
    {
      id: "actions",
      meta: { title: "Thao tác" },
      header: () => <div className="font-medium text-center">Thao tác</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center min-w-[100px]">
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
 * @deprecated Use useCategoryColumns instead
 */
export const createCategoryColumns = (
  handlers: Props
): ColumnDef<Category>[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useCategoryColumns(handlers);
};

/**
 * Adapter function to convert TanStack Table columns to custom DataTable columns
 */
export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<Category>[]
): Column<Category>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Category, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Category] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Category] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Category] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Category] : "";
      },
      width: 200,
      align: "left" as const,
      className: "",
    };
  });
};
