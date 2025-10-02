"use client";

import type { Contact } from "@/types";
import {
  ArrowLeft,
  Mail,
  Phone,
  User,
  Calendar,
  Hash,
  Send,
  Reply,
} from "lucide-react";
import { AdminContentCard, AdminPageLayout } from "@/components/admin";
import { Button } from "@/components/ui/button";
import { BadgeCell } from "@/components/table-cell";
import {
  getContactStatusConfig,
  getContactTypeConfig,
} from "@/types/enums/contact";
import { usePatchContactReply } from "@/hooks/admin/useContacts";
import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  contact?: Contact | null;
  isLoading?: boolean;
  onCancel: () => void;
  onReplySuccess?: () => void;
}

export const ContactViewForm = ({
  contact,
  isLoading = false,
  onCancel,
  onReplySuccess,
}: Props) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { isPatching, mutate: patchContactReply } = usePatchContactReply();

  const handleReplySubmit = useCallback(async () => {
    if (!contact?.id || !replyText.trim()) return;

    const success = await patchContactReply(contact.id, replyText.trim());
    if (success) {
      setReplyText("");
      setShowReplyForm(false);
      onReplySuccess?.();
    }
  }, [contact?.id, replyText, patchContactReply, onReplySuccess]);

  const handleCancelReply = useCallback(() => {
    setReplyText("");
    setShowReplyForm(false);
  }, []);

  if (isLoading || !contact) {
    return (
      <AdminPageLayout
        title="Đang tải liên hệ..."
        description="Vui lòng chờ trong giây lát"
        actions={
          <Button variant="outline" onClick={onCancel} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </Button>
        }
      >
        <AdminContentCard>
          <div className="space-y-4 animate-pulse">
            <div className="bg-gray-200 rounded w-1/4 h-4"></div>
            <div className="bg-gray-200 rounded w-1/2 h-4"></div>
            <div className="bg-gray-200 rounded w-3/4 h-4"></div>
          </div>
        </AdminContentCard>
      </AdminPageLayout>
    );
  }

  const getStatusBadge = (status: number | null | undefined) => {
    const config = getContactStatusConfig(status);

    return (
      <BadgeCell
        value={config.label}
        variant={config.variant}
        className="text-sm"
      />
    );
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <AdminPageLayout
      title={`Chi tiết liên hệ #${contact.id}`}
      description="Xem thông tin chi tiết về tin nhắn liên hệ này"
      actions={
        <Button variant="outline" onClick={onCancel} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Contact Overview */}
        <AdminContentCard>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Thông tin liên hệ</h3>
            <div className="flex gap-2">
              {getStatusBadge(contact.status)}
              <BadgeCell
                value={getContactTypeConfig(contact.type).label}
                variant="secondary"
                className="text-sm"
              />
            </div>
          </div>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Hash className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-500 text-sm">Mã liên hệ</p>
                  <p className="font-mono font-semibold">#{contact.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-500 text-sm">Họ và tên</p>
                  <p className="font-semibold">{contact.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-semibold">{contact.email}</p>
                </div>
              </div>

              {contact.phoneNumber && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Số điện thoại</p>
                    <p className="font-semibold">{contact.phoneNumber}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-500 text-sm">Ngày gửi</p>
                  <p className="font-semibold">
                    {contact.createdAt ? formatDate(contact.createdAt) : "N/A"}
                  </p>
                </div>
              </div>

              {contact.updatedAt && contact.updatedAt !== contact.createdAt && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Ngày cập nhật</p>
                    <p className="font-semibold">
                      {formatDate(contact.updatedAt)}
                    </p>
                  </div>
                </div>
              )}

              {contact.repliedAt && (
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-gray-500 text-sm">Ngày phản hồi</p>
                    <p className="font-semibold text-green-600">
                      {formatDate(contact.repliedAt)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AdminContentCard>

        {/* Message Content */}
        <AdminContentCard>
          <div className="mb-6">
            <h3 className="font-semibold text-lg">Nội dung tin nhắn</h3>
          </div>

          <div className="space-y-4">
            <div>
              <p className="mb-2 text-gray-500 text-sm">Nội dung tin nhắn</p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700 whitespace-pre-wrap">
                  {contact.message}
                </p>
              </div>
            </div>
          </div>
        </AdminContentCard>

        {/* Reply Information */}
        {contact.reply && (
          <AdminContentCard>
            <div className="mb-6">
              <h3 className="font-semibold text-lg">Phản hồi</h3>
            </div>

            <div className="space-y-4">
              {contact.repliedBy && (
                <div>
                  <p className="mb-2 text-gray-500 text-sm">Người phản hồi</p>
                  <p className="font-semibold">ID: {contact.repliedBy}</p>
                </div>
              )}

              <div>
                <p className="mb-2 text-gray-500 text-sm">Nội dung phản hồi</p>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {contact.reply}
                  </p>
                </div>
              </div>
            </div>
          </AdminContentCard>
        )}

        {/* Reply Form */}
        <AdminContentCard>
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Phản hồi liên hệ</h3>
              {!showReplyForm && !contact.reply && (
                <Button
                  onClick={() => setShowReplyForm(true)}
                  className="gap-2"
                  size="sm"
                >
                  <Reply className="w-4 h-4" />
                  Phản hồi
                </Button>
              )}
            </div>
          </div>

          {showReplyForm && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="reply" className="font-medium text-sm">
                  Nội dung phản hồi
                </Label>
                <Textarea
                  id="reply"
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder="Nhập nội dung phản hồi..."
                  className="mt-2 min-h-[120px]"
                  disabled={isPatching}
                />
                <p className="mt-1 text-gray-500 text-xs">
                  Phản hồi sẽ được gửi đến email: {contact.email}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancelReply}
                  disabled={isPatching}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleReplySubmit}
                  disabled={isPatching || !replyText.trim()}
                  className="gap-2"
                >
                  {isPatching ? (
                    <>
                      <div className="border-2 border-white border-t-transparent rounded-full w-4 h-4 animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Gửi phản hồi
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {contact.reply && !showReplyForm && (
            <div className="py-4 text-center">
              <p className="text-gray-500 text-sm">
                Liên hệ này đã được phản hồi
              </p>
              <Button
                variant="outline"
                onClick={() => setShowReplyForm(true)}
                className="gap-2 mt-2"
                size="sm"
              >
                <Reply className="w-4 h-4" />
                Phản hồi lại
              </Button>
            </div>
          )}
        </AdminContentCard>
      </div>
    </AdminPageLayout>
  );
};
