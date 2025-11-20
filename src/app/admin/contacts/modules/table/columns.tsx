import type { ColumnDef } from "@tanstack/react-table";
import type { Contact } from "@/types";
import { Column } from "@/components/data-table/data-table";
import { BadgeCell, ActionsCell } from "@/components/table-cell";
import { Mail, Phone, User, MessageSquare } from "lucide-react";
import {
  getContactStatusConfig,
  getContactTypeConfig,
} from "@/types/enums/contact";

// Status Badge Component
const StatusBadge = ({ status }: { status: number | null | undefined }) => {
  const config = getContactStatusConfig(status);

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

// Type Badge Component
const TypeBadge = ({ type }: { type: number | null | undefined }) => {
  const config = getContactTypeConfig(type);

  return (
    <div className="flex justify-center items-center min-w-[100px]">
      <BadgeCell value={config.label} variant="secondary" className="text-xs" />
    </div>
  );
};

// Contact Info Component
const ContactInfo = ({ contact }: { contact: any }) => {
  return (
    <div className="flex flex-col space-y-1 min-w-[200px]">
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-500" />
        <span className="font-semibold text-gray-900">{contact.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 text-sm">{contact.email}</span>
      </div>
      {contact.phoneNumber && (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600 text-sm">{contact.phoneNumber}</span>
        </div>
      )}
    </div>
  );
};

// Message Display Component
const MessageDisplay = ({ message }: { message: string }) => {
  const truncatedMessage =
    message.length > 50 ? `${message.substring(0, 50)}...` : message;

  return (
    <div className="flex items-center gap-2 min-w-[200px]">
      <MessageSquare className="w-4 h-4 text-gray-500" />
      <span className="font-medium text-gray-900 truncate" title={message}>
        {truncatedMessage}
      </span>
    </div>
  );
};

interface Props {
  onViewAction: (contact: Contact) => void;
}

export function useContactColumns({
  onViewAction,
}: Props): ColumnDef<Contact>[] {
  return [
    {
      accessorKey: "id",
      meta: { title: "Mã LH" },
      header: () => <div className="font-medium">Mã LH</div>,
      cell: ({ row }) => (
        <span className="font-mono text-gray-600 text-sm">
          #{row.original.id}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "contactInfo",
      meta: { title: "Thông tin liên hệ" },
      header: () => <div className="font-medium">Thông tin liên hệ</div>,
      cell: ({ row }) => <ContactInfo contact={row.original} />,
      enableSorting: false,
    },
    {
      accessorKey: "message",
      meta: { title: "Nội dung" },
      header: () => <div className="font-medium">Nội dung</div>,
      cell: ({ row }) => <MessageDisplay message={row.original.message} />,
      enableSorting: false,
    },
    {
      accessorKey: "status",
      meta: { title: "Trạng thái xử lý" },
      header: () => (
        <div className="w-full font-medium text-center">Trạng thái xử lý</div>
      ),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
      enableSorting: false,
    },
    {
      accessorKey: "type",
      meta: { title: "Loại liên hệ" },
      header: () => (
        <div className="w-full font-medium text-center">Loại liên hệ</div>
      ),
      cell: ({ row }) => <TypeBadge type={row.original.type} />,
      enableSorting: false,
    },
    {
      accessorKey: "createdAt",
      meta: { title: "Ngày gửi" },
      header: () => <div className="font-medium">Ngày gửi</div>,
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
          <span className="text-gray-600 text-sm">
            {row.original.createdAt
              ? new Date(row.original.createdAt).toLocaleDateString("vi-VN")
              : "N/A"}
          </span>
        </div>
      ),
      enableSorting: false,
      size: 120,
    },
    {
      id: "actions",
      meta: { title: "Thao tác" },
      header: () => <div className="font-medium text-center">Thao tác</div>,
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-1">
          <ActionsCell item={row.original} onView={onViewAction} />
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
  tanstackColumns: ColumnDef<Contact>[]
): Column<Contact>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Contact, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Contact] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Contact] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Contact] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Contact] : "";
      },
      width: 30,
      align: "left" as const,
      className: "",
    };
  });
};
