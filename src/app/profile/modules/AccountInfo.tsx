"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useAccountInfo } from "@/hooks/user/useAccountInfo";
import { showToast } from "@/components/ui/toast";
import { Calendar, Globe, Upload, Trash2 } from "lucide-react";

interface AccountInfoProps {
  user: any;
  onSwitchToPassword: () => void;
}

export default function AccountInfo({
  user,
  onSwitchToPassword,
}: AccountInfoProps) {
  const { userInfo, updateProfile, validateFile } = useAccountInfo({
    userId: user.id,
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpdateProfile = async () => {
    // Validate: must have at least name or image to update
    const hasNameChange =
      editName.trim() && editName.trim() !== userInfo?.fullName;
    const hasImageChange = selectedFile !== null;

    if (!hasNameChange && !hasImageChange) {
      showToast.error("Vui lòng thay đổi tên hoặc chọn ảnh đại diện mới");
      return;
    }

    if (selectedFile && !validateFile(selectedFile)) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Only send fields that have changed
      const updateData: { fullName: string; profileImage?: File } = {
        fullName: editName.trim() || userInfo?.fullName || "",
      };

      if (selectedFile) {
        updateData.profileImage = selectedFile;
      }

      const success = await updateProfile(updateData);

      if (success) {
        setIsEditModalOpen(false);
        setSelectedFile(null);
        if (previewUrl && previewUrl.startsWith("blob:")) {
          URL.revokeObjectURL(previewUrl);
        }
        setPreviewUrl(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!validateFile(file)) {
        e.target.value = "";
        return;
      }

      setSelectedFile(file);

      // Create preview URL for local preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    },
    [validateFile]
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleRemoveImage = useCallback(() => {
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [previewUrl]);

  const openEditModal = () => {
    setEditName(userInfo?.fullName || "");
    setSelectedFile(null);
    // Use profileImage or avatar, prioritize profileImage from API
    const imageUrl = userInfo?.profileImage || userInfo?.avatar || null;
    setPreviewUrl(imageUrl);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6 w-full min-w-0">
      <h1 className="font-bold text-xl sm:text-2xl">Thông tin tài khoản</h1>

      {/* Profile Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 bg-gray-50 p-3 sm:p-4 rounded-lg w-full min-w-0">
        <div className="flex flex-col items-start space-y-1 sm:space-y-2 min-w-0 flex-1">
          <h2 className="font-semibold text-lg sm:text-xl break-words w-full">
            {userInfo?.fullName || "Chưa cập nhật"}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base break-words w-full">
            {userInfo?.email}
          </p>
        </div>
        <Button
          onClick={openEditModal}
          className="flex-shrink-0 w-full sm:w-auto text-sm sm:text-base px-4 py-2 h-9 sm:h-10"
        >
          Chỉnh sửa
        </Button>
      </div>

      {/* Profile Details */}
      <div className="space-y-3 sm:space-y-4 w-full min-w-0">
        <h2 className="font-semibold text-base sm:text-lg">Hồ sơ</h2>
        <div className="space-y-3 w-full min-w-0">
          <div className="w-full min-w-0">
            <Label className="font-medium text-gray-700 text-xs sm:text-sm">
              Email
            </Label>
            <p className="text-gray-900 text-sm sm:text-base break-words w-full mt-1">
              {userInfo?.email}
            </p>
          </div>
          <Separator />
          <div className="w-full min-w-0">
            <Label className="font-medium text-gray-700 text-xs sm:text-sm">
              Mật khẩu
            </Label>
            <p className="text-gray-900 text-sm sm:text-base mt-1">********</p>
            <Button
              variant="link"
              onClick={onSwitchToPassword}
              className="p-0 h-auto text-xs sm:text-sm mt-1"
            >
              Đổi mật khẩu
            </Button>
          </div>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="space-y-3 sm:space-y-4 w-full min-w-0">
        <h2 className="font-semibold text-base sm:text-lg">
          Thông tin gói đăng ký
        </h2>
        {userInfo?.userSub ? (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 border border-blue-200 rounded-lg w-full min-w-0">
            <div className="flex items-center space-x-2 mb-3 min-w-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
              <span className="font-semibold text-blue-900 text-sm sm:text-base break-words">
                {userInfo.userSub.subscription?.nameSub || "PREMIUM"}
              </span>
            </div>

            <div className="gap-3 sm:gap-4 grid grid-cols-1 md:grid-cols-2 w-full min-w-0">
              <div className="space-y-1 min-w-0">
                <p className="font-medium text-gray-700 text-xs sm:text-sm">
                  Ngày bắt đầu
                </p>
                <p className="text-gray-900 text-sm sm:text-base break-words">
                  {new Date(userInfo.userSub.startDate).toLocaleDateString(
                    "vi-VN",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
              <div className="space-y-1 min-w-0">
                <p className="font-medium text-gray-700 text-xs sm:text-sm">
                  Ngày hết hạn
                </p>
                <p className="text-gray-900 text-sm sm:text-base break-words">
                  {new Date(userInfo.userSub.endDate).toLocaleDateString(
                    "vi-VN",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-blue-200 border-t">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 min-w-0">
                <span className="text-gray-600 text-xs sm:text-sm">
                  Trạng thái
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                    userInfo.userSub.status === 1
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {userInfo.userSub.status === 1 ? "Đang hoạt động" : "Hết hạn"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 p-3 sm:p-4 border border-gray-200 rounded-lg w-full min-w-0">
            <div className="flex items-center space-x-2 min-w-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
              <p className="text-gray-600 text-sm sm:text-base break-words">
                Chưa có thông tin gói đăng ký
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Connected Accounts */}
      <div className="space-y-3 sm:space-y-4 w-full min-w-0">
        <h2 className="font-semibold text-base sm:text-lg">
          Tài khoản đã liên kết
        </h2>
        <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-50 p-3 rounded-lg w-full min-w-0">
          <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
          <span className="font-medium text-sm sm:text-base flex-shrink-0">
            Google
          </span>
          <span className="text-gray-600 text-xs sm:text-sm break-words min-w-0 truncate">
            {userInfo?.email}
          </span>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-md w-full min-w-0 max-h-[90vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader className="w-full min-w-0">
            <DialogTitle className="w-full min-w-0 break-words text-left text-lg sm:text-xl">
              Cập nhật hồ sơ
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 w-full min-w-0">
            {/* Image Upload Section */}
            <div className="w-full min-w-0">
              <Label className="mb-2 block font-medium text-sm">
                Ảnh đại diện
              </Label>
              <p className="mb-3 text-gray-500 text-xs break-words">
                Hỗ trợ định dạng JPG, GIF, PNG, kích thước tối đa 800KB.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 w-full min-w-0">
                {/* Image Preview */}
                <div className="flex-shrink-0">
                  {previewUrl ? (
                    <div className="relative border rounded-lg overflow-hidden w-20 h-20 sm:w-24 sm:h-24">
                      <Image
                        src={previewUrl}
                        alt="Preview"
                        fill
                        className="object-cover"
                        onError={e => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center items-center bg-gray-50 border-2 border-gray-300 border-dashed rounded-lg w-20 h-20 sm:w-24 sm:h-24">
                      <div className="text-gray-400 text-xs text-center px-2">
                        No Image
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 flex-1 min-w-0 w-full sm:w-auto">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleUploadClick}
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 w-full sm:w-auto text-sm"
                  >
                    <Upload className="w-4 h-4" />
                    Tải ảnh lên
                  </Button>

                  {previewUrl && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveImage}
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 hover:bg-red-50 text-red-600 hover:text-red-700 w-full sm:w-auto text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Xóa ảnh
                    </Button>
                  )}

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/gif"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>
            <div className="w-full min-w-0">
              <Label
                htmlFor="fullName"
                className="w-full min-w-0 block mb-1.5 text-sm"
              >
                Tên hiển thị
              </Label>
              <Input
                id="fullName"
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="Nhập tên hiển thị"
                maxLength={50}
                className="w-full min-w-0 h-10 sm:h-11 text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full min-w-0 pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedFile(null);
                  if (previewUrl && previewUrl.startsWith("blob:")) {
                    URL.revokeObjectURL(previewUrl);
                  }
                  // Use profileImage or avatar, prioritize profileImage from API
                  const imageUrl =
                    userInfo?.profileImage || userInfo?.avatar || null;
                  setPreviewUrl(imageUrl);
                }}
                disabled={isSubmitting}
                className="flex-1 w-full min-w-0 h-10 sm:h-11 text-sm sm:text-base"
              >
                Hủy bỏ
              </Button>
              <Button
                onClick={handleUpdateProfile}
                disabled={isSubmitting}
                className="flex-1 w-full min-w-0 h-10 sm:h-11 text-sm sm:text-base"
              >
                {isSubmitting ? "Đang xử lý..." : "Cập nhật"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
