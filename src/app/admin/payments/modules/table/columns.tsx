import type { ColumnDef } from "@tanstack/react-table";
import type { Payment } from "@/types";
import { Column } from "@/components/data-table/data-table";
import { BadgeCell, ActionsCell } from "@/components/table-cell";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { useSubscriptions } from "@/hooks/admin/useSubscription";
import { getPaymentStatusConfig } from "@/constants/payment-status";

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const config = getPaymentStatusConfig(status);

  return (
    <div className="flex justify-center items-center min-w-[100px]">
      <BadgeCell
        value={config.label}
        variant={config.variant}
        className="text-xs"
      />
    </div>
  );
};

// Payment Method Badge Component
const PaymentMethodBadge = ({ method }: { method: string }) => {
  return (
    <div className="flex items-center gap-2">
      <CreditCard className="w-4 h-4 text-gray-500" />
      <BadgeCell
        label={method || "N/A"}
        variant="secondary"
        maxWidth="max-w-[100px]"
      />
    </div>
  );
};

// Amount Display Component
const AmountDisplay = ({ amount }: { amount: number }) => {
  const formatAmount = (amount: number) => {
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
    <div className="flex justify-end items-center gap-1">
      <DollarSign className="w-4 h-4 text-green-600" />
      <span className="font-semibold text-green-600">
        {formatAmount(amount)}
      </span>
    </div>
  );
};

// User Display Component
const UserDisplay = ({ user }: { user: any }) => {
  return (
    <div className="flex flex-col space-y-1 min-w-[180px]">
      <span className="font-semibold text-gray-900">
        {user?.fullName || "N/A"}
      </span>
      <span className="text-gray-500 text-sm">{user?.email || "N/A"}</span>
    </div>
  );
};

// Subscription Badge Component
const SubscriptionBadge = ({
  subscriptionId,
  subscriptions,
}: {
  subscriptionId: string | number;
  subscriptions: any[];
}) => {
  const subscription = subscriptions.find(sub => sub.id === subscriptionId);

  const getSubscriptionVariant = (type: number) => {
    switch (type) {
      case 1:
        return "premium"; // Premium subscription
      case 2:
        return "default"; // Standard subscription
      default:
        return "secondary";
    }
  };

  if (!subscription) {
    return (
      <div className="flex justify-center items-center min-w-[120px]">
        <BadgeCell value="N/A" variant="secondary" className="text-xs" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-w-[120px]">
      <BadgeCell
        value={subscription.name}
        variant={getSubscriptionVariant(subscription.type)}
        icon={<Package className="w-3 h-3" />}
        className="text-xs"
      />
    </div>
  );
};

interface Props {
  onViewAction: (payment: Payment) => void;
  onDeleteAction: (payment: Payment) => void;
}

export function usePaymentColumns({
  onViewAction,
}: Props): ColumnDef<Payment>[] {
  // Fetch subscriptions data
  const { subscriptions } = useSubscriptions({});
  return [
    {
      accessorKey: "id",
      meta: { title: "Mã GD" },
      header: () => <div className="font-medium">Mã GD</div>,
      cell: ({ row }) => (
        <span className="font-mono text-gray-600 text-sm">
          #{row.original.id}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "user",
      meta: { title: "Người dùng" },
      header: () => <div className="font-medium">Người dùng</div>,
      cell: ({ row }) => <UserDisplay user={row.original.user} />,
      enableSorting: false,
    },
    {
      accessorKey: "amount",
      meta: { title: "Số tiền" },
      header: () => <div className="font-medium text-right">Số tiền</div>,
      cell: ({ row }) => <AmountDisplay amount={row.original.amount} />,
      enableSorting: false,
    },
    {
      accessorKey: "method",
      meta: { title: "Phương thức" },
      header: () => <div className="font-medium">Phương thức</div>,
      cell: ({ row }) => (
        <PaymentMethodBadge method={row.original.paymentMethod} />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "subscription",
      meta: { title: "Gói đăng ký" },
      header: () => <div className="font-medium">Gói đăng ký</div>,
      cell: ({ row }) => (
        <SubscriptionBadge
          subscriptionId={row.original.subscriptionId}
          subscriptions={subscriptions}
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "paymentStatus",
      meta: { title: "Trạng thái" },
      header: () => (
        <div className="w-full font-medium text-center">Trạng thái</div>
      ),
      cell: ({ row }) => <StatusBadge status={row.original.paymentStatus} />,
      enableSorting: false,
    },
    {
      accessorKey: "paymentDate",
      meta: { title: "Ngày thanh toán" },
      header: () => <div className="font-medium">Ngày thanh toán</div>,
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
          <span className="text-gray-600 text-sm">
            {row.original.paymentDate
              ? new Date(row.original.paymentDate).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })
              : "N/A"}
          </span>
        </div>
      ),
      enableSorting: false,
      size: 160,
    },
    {
      id: "actions",
      meta: { title: "Thao tác" },
      header: () => <div className="font-medium text-center">Thao tác</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-1">
          <ActionsCell item={row.original} onEdit={onViewAction} />
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
  tanstackColumns: ColumnDef<Payment>[]
): Column<Payment>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Payment, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Payment] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Payment] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Payment] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Payment] : "";
      },
      width: 30,
      align: "left" as const,
      className: "",
    };
  });
};
