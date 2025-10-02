import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "@/types";
import { Column } from "@/components/data-table/data-table";
import { ImageCell, BadgeCell, ActionsCell } from "@/components/table-cell";
import { Package, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { showToast } from "@/components/ui/toast";

// Copy Link Button Component
const CopyLinkButton = ({ link }: { link: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
      showToast.success("Link đã được copy vào clipboard");

      // Reset after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      showToast.error("Không thể copy link");
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopyLink}
      className="hover:bg-gray-100 p-0 w-8 h-8"
      title="Copy link"
    >
      {isCopied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4 text-gray-600" />
      )}
    </Button>
  );
};

interface Props {
  onEditAction: (product: Product) => void;
  onDeleteAction: (product: Product) => void;
}

export function useProductColumns({
  onEditAction,
  onDeleteAction,
}: Props): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "image",
      meta: { title: "Hình ảnh" },
      header: () => (
        <div className="hidden md:block w-full font-medium text-center">
          Hình ảnh
        </div>
      ),
      cell: ({ row }) => (
        <div className="hidden md:flex justify-center items-center">
          {row.original.image && row.original.image.length > 0 ? (
            <ImageCell
              src={row.original.image}
              alt={row.original.name}
              size="sm"
              className="rounded-md"
            />
          ) : (
            <Package className="w-6 h-6 text-gray-400" />
          )}
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      meta: { title: "Tên sản phẩm" },
      header: () => <div className="font-medium">Tên sản phẩm</div>,
      cell: ({ row }) => (
        <div className="flex flex-col space-y-1 min-w-[200px] max-w-[300px]">
          <span
            className="font-semibold text-gray-900 truncate"
            title={row.original.name}
          >
            {row.original.name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "link",
      meta: { title: "Link" },
      header: () => <div className="hidden lg:block font-medium">Link</div>,
      cell: ({ row }) => {
        const link = row.original.link;

        return (
          <div className="hidden lg:flex items-center gap-2 max-w-[300px]">
            {link ? (
              <>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-blue-600 hover:text-blue-800 text-sm truncate"
                  title={link}
                >
                  {link.length > 40 ? `${link.substring(0, 40)}...` : link}
                </a>
                <CopyLinkButton link={link} />
              </>
            ) : (
              <span className="text-gray-400 text-sm">N/A</span>
            )}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "section",
      meta: { title: "Section" },
      header: () => <div className="hidden lg:block font-medium">Section</div>,
      cell: ({ row }) => {
        const categoryName = row.original.section?.name || "N/A";

        return (
          <div className="hidden lg:block">
            <BadgeCell
              value={categoryName}
              variant="secondary"
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
 * @deprecated Use useProductColumns instead
 */
export const createProductColumns = (handlers: Props): ColumnDef<Product>[] => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useProductColumns(handlers);
};

/**
 * Adapter function to convert TanStack Table columns to custom DataTable columns
 */
export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<Product>[]
): Column<Product>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Product, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Product] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Product] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Product] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Product] : "";
      },
      width: 200,
      align: "left" as const,
      className: "",
    };
  });
};
