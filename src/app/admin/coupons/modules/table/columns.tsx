import type { ColumnDef } from "@tanstack/react-table";
import type { Coupon } from "@/types/entities/coupon";
import { Column } from "@/components/data-table/data-table";
import { BadgeCell, ActionsCell } from "@/components/table-cell";
import { COUPON_CONSTANTS } from "@/constants/coupon";
import { getCouponStatusConfig } from "@/constants/coupon-status";
import { Copy, Check, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { showToast } from "@/components/ui/toast";

// Copy Code Button Component
const CopyCodeButton = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      showToast.success(COUPON_CONSTANTS.MESSAGES.COPY_SUCCESS);

      // Reset after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch {
      showToast.error(COUPON_CONSTANTS.MESSAGES.COPY_ERROR);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopyCode}
      className="hover:bg-gray-100 p-0 w-8 h-8"
      title="Copy mã giảm giá"
    >
      {isCopied ? (
        <Check className="w-4 h-4 text-green-600" />
      ) : (
        <Copy className="w-4 h-4 text-gray-600" />
      )}
    </Button>
  );
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const config = getCouponStatusConfig(status);

  return (
    <BadgeCell
      value={config.label}
      variant={config.variant}
      className="text-xs"
    />
  );
};

// Type Badge Component
const TypeBadge = ({ type }: { type: string }) => {
  return (
    <BadgeCell
      value={
        COUPON_CONSTANTS.TYPE_LABELS[
          type as keyof typeof COUPON_CONSTANTS.TYPE_LABELS
        ] || type
      }
      variant="premium"
      className="text-xs"
    />
  );
};

// Discount Display Component
const DiscountDisplay = ({
  type,
  discount,
}: {
  type: string;
  discount: string;
}) => {
  const formatDiscount = (type: string, discount: string) => {
    if (type === COUPON_CONSTANTS.TYPES.PERCENT) {
      return `${discount}%`;
    }

    const amount = Number(discount);
    if (!amount || amount === 0) return "0 VNĐ";

    // Convert to integer to remove decimal places
    const integerAmount = Math.round(amount);

    // Format with dots as thousands separator for better readability
    const formatted = integerAmount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${formatted} VNĐ`;
  };

  return (
    <span className="font-medium text-gray-900">
      {formatDiscount(type, discount)}
    </span>
  );
};

// Usage Display Component
const UsageDisplay = ({
  usageCount,
  maxUsage,
}: {
  usageCount: number;
  maxUsage: number;
}) => {
  return (
    <div className="flex items-center gap-1">
      <span className="text-gray-600">{usageCount}</span>
      <span className="text-gray-400">/</span>
      <span className="text-gray-600">{maxUsage}</span>
    </div>
  );
};

interface Props {
  onEditAction: (coupon: Coupon) => void;
  onDeleteAction: (coupon: Coupon) => void;
}

export function useCouponColumns({
  onEditAction,
  onDeleteAction,
}: Props): ColumnDef<Coupon>[] {
  return [
    {
      accessorKey: "code",
      meta: { title: "Mã giảm giá" },
      header: () => <div className="font-medium">Mã giảm giá</div>,
      cell: ({ row }) => (
        <div className="flex items-center gap-2 min-w-[150px]">
          <Tag className="w-4 h-4 text-gray-400" />
          <span className="font-mono font-semibold text-gray-900">
            {row.original.code}
          </span>
          <CopyCodeButton code={row.original.code} />
        </div>
      ),
    },
    {
      accessorKey: "discount",
      meta: { title: "Giá trị giảm giá" },
      header: () => <div className="font-medium">Giá trị giảm giá</div>,
      cell: ({ row }) => (
        <div className="min-w-[120px]">
          <DiscountDisplay
            type={row.original.type}
            discount={row.original.discount}
          />
        </div>
      ),
    },
    {
      accessorKey: "type",
      meta: { title: "Loại" },
      header: () => <div className="font-medium">Loại</div>,
      cell: ({ row }) => <TypeBadge type={row.original.type} />,
      enableSorting: false,
    },
    {
      accessorKey: "usage",
      meta: { title: "Sử dụng" },
      header: () => <div className="font-medium">Sử dụng</div>,
      cell: ({ row }) => (
        <UsageDisplay
          usageCount={row.original.usageCount}
          maxUsage={row.original.maxUsage}
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "status",
      meta: { title: "Trạng thái" },
      header: () => <div className="font-medium">Trạng thái</div>,
      cell: ({ row }) => {
        const now = new Date();
        const expiryDate = new Date(row.original.expiryDate);

        let status = row.original.isActive ? "active" : "inactive";

        if (now > expiryDate) {
          status = "expired";
        } else if (row.original.usageCount >= row.original.maxUsage) {
          status = "used_up";
        }

        return <StatusBadge status={status} />;
      },
      enableSorting: false,
    },
    {
      accessorKey: "expiryDate",
      meta: { title: "Ngày hết hạn" },
      header: () => <div className="font-medium">Ngày hết hạn</div>,
      cell: ({ row }) => (
        <span className="text-gray-600 text-sm">
          {new Date(row.original.expiryDate).toLocaleDateString("vi-VN")}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      meta: { title: "Ngày tạo" },
      header: () => <div className="font-medium">Ngày tạo</div>,
      cell: ({ row }) => {
        return (
          <div className="whitespace-nowrap">
            <span className="text-gray-600 text-sm">
              {row.original.createdAt
                ? new Date(row.original.createdAt).toLocaleDateString("vi-VN")
                : "N/A"}
            </span>
          </div>
        );
      },
      enableSorting: false,
      size: 120,
    },
    {
      id: "actions",
      meta: { title: "Thao tác" },
      header: () => <div className="font-medium text-center">Thao tác</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-1">
          <ActionsCell
            item={row.original}
            onEdit={onEditAction}
            onDelete={onDeleteAction}
          />
        </div>
      ),
      enableSorting: false,
      size: 100,
    },
  ];
}

/**
 * Adapter function to convert TanStack Table columns to custom DataTable columns
 */
export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<Coupon>[]
): Column<Coupon>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Coupon, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Coupon] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Coupon] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Coupon] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Coupon] : "";
      },
      width: 30,
      align: "left" as const,
      className: "",
    };
  });
};
