import type { ColumnDef } from "@tanstack/react-table";
import type { Blog } from "@/types";
import { Column } from "@/components/data-table/data-table";
import { ImageCell, BadgeCell, ActionsCell } from "@/components/table-cell";
import { BLOG_CONSTANTS } from "@/constants/blog";
import { FileText } from "lucide-react";

interface Props {
  onEditAction: (blog: Blog) => void;
  onDeleteAction: (blog: Blog) => void;
}

export function useBlogColumns({
  onEditAction,
  onDeleteAction,
}: Props): ColumnDef<Blog>[] {
  return [
    {
      accessorKey: "featuredImage",
      meta: { title: "Hình ảnh" },
      header: () => (
        <div className="hidden md:block w-full font-medium text-center">
          Hình ảnh
        </div>
      ),
      cell: ({ row }) => (
        <div className="hidden md:flex justify-center items-center">
          {row.original.featuredImage ? (
            <ImageCell
              src={row.original.featuredImage as string}
              alt={row.original.title}
              size="sm"
              className="rounded-md"
            />
          ) : (
            <FileText className="w-6 h-6 text-gray-400" />
          )}
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "title",
      meta: { title: "Tiêu đề Blog" },
      header: () => <div className="font-medium">Tiêu đề Blog</div>,
      cell: ({ row }) => (
        <div className="flex flex-col space-y-1 min-w-[200px] max-w-[300px]">
          <span
            className="font-semibold text-gray-900 truncate"
            title={row.original.title}
          >
            {row.original.title}
          </span>
          {row.original.metaDescription && (
            <span
              className="text-gray-500 text-xs truncate"
              title={row.original.metaDescription}
            >
              {row.original.metaDescription}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      meta: { title: "Trạng thái" },
      header: () => (
        <div className="hidden lg:block font-medium">Trạng thái</div>
      ),
      cell: ({ row }) => (
        <div className="hidden lg:block">
          <BadgeCell
            label={row.original.publishedAt ? "Đã xuất bản" : "Bản nháp"}
            variant={row.original.publishedAt ? "premium" : "default"}
            className="min-w-[100px]"
          />
        </div>
      ),
      enableSorting: false,
      size: 120,
    },
    {
      accessorKey: "category",
      meta: { title: "Danh mục" },
      header: () => <div className="hidden lg:block font-medium">Danh mục</div>,
      cell: ({ row }) => {
        const categoryName =
          row.original.category?.name ||
          row.original.blogCategory?.name ||
          "N/A";

        // Dynamic variant based on category name
        const getCategoryVariant = (
          name: string
        ): "ai" | "tech" | "business" | "secondary" => {
          const lowerName = name.toLowerCase();
          if (
            lowerName.includes(BLOG_CONSTANTS.CATEGORY.AI.toLowerCase()) ||
            lowerName.includes("artificial")
          )
            return "ai";
          if (lowerName.includes("tech") || lowerName.includes("technology"))
            return "tech";
          if (
            lowerName.includes(
              BLOG_CONSTANTS.CATEGORY.BUSINESS.toLowerCase()
            ) ||
            lowerName.includes(BLOG_CONSTANTS.CATEGORY.MARKETING.toLowerCase())
          )
            return "business";
          return "secondary";
        };

        return (
          <div className="hidden lg:block">
            <BadgeCell
              value={categoryName}
              variant={getCategoryVariant(categoryName)}
              className="text-xs"
            />
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      meta: { title: "Ngày tạo" },
      header: () => <div className="hidden md:block font-medium">Ngày tạo</div>,
      cell: ({ row }) => (
        <div className="hidden md:block">
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
      accessorKey: "updatedAt",
      meta: { title: "Cập nhật cuối" },
      header: () => (
        <div className="hidden lg:block font-medium">Cập nhật cuối</div>
      ),
      cell: ({ row }) => (
        <div className="hidden lg:block">
          <span className="text-gray-600 text-sm">
            {row.original.updatedAt
              ? new Date(row.original.updatedAt).toLocaleDateString("vi-VN")
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
        <div className="flex justify-center items-center min-w-[120px]">
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
 * @deprecated Use useBlogColumns instead
 */
export const createBlogColumns = (handlers: Props): ColumnDef<Blog>[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useBlogColumns(handlers);
};

/**
 * Adapter function to convert TanStack Table columns to custom DataTable columns
 */
export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<Blog>[]
): Column<Blog>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Blog, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Blog] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Blog] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Blog] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Blog] : "";
      },
      width: 200,
      align: "left" as const,
      className: "",
    };
  });
};
