import type { ColumnDef } from "@tanstack/react-table";
import type { Feedback } from "@/types";
import { Column } from "@/components/data-table/data-table";
import { BadgeCell, ActionsCell } from "@/components/table-cell";
import { Mail, Phone, User, MessageSquare } from "lucide-react";
import { getFeedbackStatusConfig } from "@/types/enums/feedback";

const StatusBadge = ({ status }: { status: number | null | undefined }) => {
  const config = getFeedbackStatusConfig(status);

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

const FeedbackInfo = ({ feedback }: { feedback: any }) => {
  return (
    <div className="flex flex-col space-y-1 min-w-[200px]">
      <div className="flex items-center gap-2">
        <User className="w-4 h-4 text-gray-500" />
        <span className="font-semibold text-gray-900">
          {feedback.feedbackName || feedback.fullName || "N/A"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Mail className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600 text-sm">{feedback.email}</span>
      </div>
      {feedback.phone && (
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span className="text-gray-600 text-sm">{feedback.phone}</span>
        </div>
      )}
    </div>
  );
};

const MessageDisplay = ({
  message,
}: {
  message: string | null | undefined;
}) => {
  if (!message)
    return <span className="text-gray-400 text-sm">Không có nội dung</span>;

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
  onViewAction: (feedback: Feedback) => void;
}

export function useFeedbackColumns({
  onViewAction,
}: Props): ColumnDef<Feedback>[] {
  return [
    {
      accessorKey: "id",
      meta: { title: "Mã FB" },
      header: () => <div className="font-medium">Mã FB</div>,
      cell: ({ row }) => (
        <span className="font-mono text-gray-600 text-sm">
          #{row.original.id}
        </span>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "feedbackInfo",
      meta: { title: "Thông tin người gửi" },
      header: () => <div className="font-medium">Thông tin người gửi</div>,
      cell: ({ row }) => <FeedbackInfo feedback={row.original} />,
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

export const adaptColumnsForDataTable = (
  tanstackColumns: ColumnDef<Feedback>[]
): Column<Feedback>[] => {
  return tanstackColumns.map(col => {
    const accessorKey = "accessorKey" in col ? col.accessorKey : "";
    const id = "id" in col ? col.id : "";
    const title = (col.meta as any)?.title || "";

    return {
      key: accessorKey || id || "",
      title,
      render: (_: unknown, record: Feedback, index: number) => {
        if (col.cell && typeof col.cell === "function") {
          try {
            return (col.cell as any)({
              row: { original: record, index },
              getValue: () =>
                accessorKey ? record[accessorKey as keyof Feedback] : undefined,
              column: col,
              table: {},
              cell: {},
              renderValue: () =>
                accessorKey ? record[accessorKey as keyof Feedback] : undefined,
            });
          } catch {
            return accessorKey ? record[accessorKey as keyof Feedback] : "";
          }
        }
        return accessorKey ? record[accessorKey as keyof Feedback] : "";
      },
      width: 30,
      align: "left" as const,
      className: "",
    };
  });
};
