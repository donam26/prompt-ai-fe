"use client";

import type { Feedback } from "@/types";
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
import { getFeedbackStatusConfig } from "@/types/enums/feedback";
import { usePatchFeedbackReply } from "@/hooks/admin/useFeedback";
import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  feedback?: Feedback | null;
  isLoading?: boolean;
  onCancel: () => void;
  onReplySuccess?: () => void;
}

export const FeedbackViewForm = ({
  feedback,
  isLoading = false,
  onCancel,
  onReplySuccess,
}: Props) => {
  const [replyText, setReplyText] = useState("");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { isPatching, mutate: patchFeedbackReply } = usePatchFeedbackReply();

  const handleReplySubmit = useCallback(async () => {
    if (!feedback?.id || !replyText.trim()) return;

    const success = await patchFeedbackReply(feedback.id, replyText.trim());
    if (success) {
      setReplyText("");
      setShowReplyForm(false);
      onReplySuccess?.();
    }
  }, [feedback?.id, replyText, patchFeedbackReply, onReplySuccess]);

  const handleCancelReply = useCallback(() => {
    setReplyText("");
    setShowReplyForm(false);
  }, []);

  if (isLoading || !feedback) {
    return (
      <AdminPageLayout
        title="Đang tải feedback..."
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
    const config = getFeedbackStatusConfig(status);

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
      title={`Chi tiết Feedback #${feedback.id}`}
      description="Xem thông tin chi tiết về feedback này"
      actions={
        <Button variant="outline" onClick={onCancel} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Feedback Overview */}
        <AdminContentCard>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Thông tin feedback</h3>
            <div className="flex gap-2">{getStatusBadge(feedback.status)}</div>
          </div>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Hash className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-500 text-sm">Mã feedback</p>
                  <p className="font-mono font-semibold">#{feedback.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-500 text-sm">Tên người gửi</p>
                  <p className="font-semibold">
                    {feedback.feedbackName || feedback.fullName || "N/A"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-semibold">{feedback.email}</p>
                </div>
              </div>

              {feedback.phone && (
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-gray-500 text-sm">Số điện thoại</p>
                    <p className="font-semibold">{feedback.phone}</p>
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
                    {feedback.createdAt
                      ? formatDate(feedback.createdAt)
                      : "N/A"}
                  </p>
                </div>
              </div>

              {feedback.updatedAt &&
                feedback.updatedAt !== feedback.createdAt && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-gray-500 text-sm">Ngày cập nhật</p>
                      <p className="font-semibold">
                        {formatDate(feedback.updatedAt)}
                      </p>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </AdminContentCard>

        {/* Message Content */}
        {feedback.message && (
          <AdminContentCard>
            <div className="mb-6">
              <h3 className="font-semibold text-lg">Nội dung feedback</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-gray-500 text-sm">Nội dung tin nhắn</p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {feedback.message}
                  </p>
                </div>
              </div>
            </div>
          </AdminContentCard>
        )}

        {/* Reply Information */}
        {feedback.reply && (
          <AdminContentCard>
            <div className="mb-6">
              <h3 className="font-semibold text-lg">Phản hồi</h3>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 text-gray-500 text-sm">Nội dung phản hồi</p>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {feedback.reply}
                  </p>
                </div>
              </div>
            </div>
          </AdminContentCard>
        )}

        {/* Reply Form */}
        {feedback.status !== 2 && (
          <AdminContentCard>
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Phản hồi feedback</h3>
                {!showReplyForm && (
                  <Button
                    onClick={() => setShowReplyForm(true)}
                    className="gap-2"
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
                  <Label htmlFor="reply" className="mb-2">
                    Nội dung phản hồi
                  </Label>
                  <Textarea
                    id="reply"
                    placeholder="Nhập nội dung phản hồi..."
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
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
                    disabled={!replyText.trim() || isPatching}
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {isPatching ? "Đang gửi..." : "Gửi phản hồi"}
                  </Button>
                </div>
              </div>
            )}
          </AdminContentCard>
        )}
      </div>
    </AdminPageLayout>
  );
};
