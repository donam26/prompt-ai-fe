"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { AdminContentCard } from "@/components/admin/common/admin-content-card";
import { Badge } from "@/components/ui/badge";
import { Mail, Clock, CheckCircle2, Send } from "lucide-react";
import { useContacts } from "@/hooks/admin/useContacts";
import { DEFAULT_PAGINATION } from "@/constants";
import { CONTACTS_CONSTANTS } from "@/constants/contacts";
import type { Contact } from "@/types";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) {
    return `${diffMins} phút trước`;
  }
  if (diffHours < 24) {
    return `${diffHours} giờ trước`;
  }
  if (diffDays < 7) {
    return `${diffDays} ngày trước`;
  }
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

interface MailLogItemProps {
  readonly contact: Contact;
  readonly onView: (contact: Contact) => void;
}

const MailLogItem = ({
  contact,
  onView,
}: MailLogItemProps): React.JSX.Element => {
  const isReplied = contact.status === CONTACTS_CONSTANTS.STATUS.REPLIED;
  const timestamp = contact.repliedAt || contact.createdAt || "";

  return (
    <div
      className={`group flex justify-between items-center p-4 rounded-lg transition-all cursor-pointer ${
        isReplied
          ? "hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700"
          : "bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500 dark:border-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30"
      }`}
      onClick={() => onView(contact)}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onView(contact);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Xem chi tiết contact ${contact.email}`}
    >
      <div className="flex flex-1 items-center gap-4 min-w-0">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isReplied
              ? "bg-green-50 dark:bg-green-900/20"
              : "bg-primary-100 dark:bg-primary-900/30"
          }`}
        >
          {isReplied ? (
            <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          ) : (
            <Clock className="w-5 h-5 text-primary-600 dark:text-primary-400" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm truncate">
              {contact.message?.substring(0, 50) || "Không có nội dung"}...
            </p>
            <Badge
              variant={isReplied ? "secondary" : "default"}
              className="text-xs"
            >
              {isReplied ? "Đã trả lời" : "Chưa trả lời"}
            </Badge>
          </div>
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-xs">
            <span className="flex items-center gap-1 truncate">
              <Mail className="flex-shrink-0 w-3 h-3" />
              <span className="truncate">{contact.email}</span>
            </span>
            {timestamp && (
              <span className="flex flex-shrink-0 items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(timestamp)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const MailLogs = (): React.JSX.Element => {
  const router = useRouter();

  const { contactsWithPagination, isFetching } = useContacts({
    pagination: { ...DEFAULT_PAGINATION, pageSize: 5 },
    filters: CONTACTS_CONSTANTS.INITIAL_FILTERS,
  });

  const contacts = useMemo(
    () => contactsWithPagination?.data || [],
    [contactsWithPagination]
  );

  const handleViewContact = (contact: Contact): void => {
    router.push(CONTACTS_CONSTANTS.ROUTES.CONTACT_VIEW(contact.id));
  };

  const handleViewAll = (): void => {
    router.push(CONTACTS_CONSTANTS.ROUTES.CONTACTS);
  };

  return (
    <AdminContentCard
      title="Log mail gần nhất"
      description="Lịch sử gửi email gần đây"
      padding="lg"
    >
      <div className="space-y-4">
        {isFetching ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 dark:bg-gray-700 rounded-lg h-20 animate-pulse"
              />
            ))}
          </div>
        ) : contacts.length === 0 ? (
          <div className="py-8 text-gray-500 dark:text-gray-400 text-center">
            <Send className="mx-auto mb-3 w-12 h-12 text-gray-300" />
            <p className="text-sm">Chưa có log mail nào</p>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map(contact => (
              <MailLogItem
                key={contact.id}
                contact={contact}
                onView={handleViewContact}
              />
            ))}
          </div>
        )}

        {contacts.length > 0 && (
          <button
            onClick={handleViewAll}
            className="flex justify-center items-center gap-2 mt-4 py-2 w-full font-medium text-primary hover:text-primary/80 text-sm transition-colors"
            aria-label="Xem tất cả log mail"
          >
            Xem tất cả log mail
            <Send className="w-4 h-4" />
          </button>
        )}
      </div>
    </AdminContentCard>
  );
};
