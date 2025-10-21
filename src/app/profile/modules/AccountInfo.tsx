"use client";

import { useState } from "react";
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
import { Calendar, Globe } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpdateProfile = async () => {
    if (!editName.trim()) {
      return;
    }

    if (selectedFile && !validateFile(selectedFile)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await updateProfile({
        fullName: editName.trim(),
        profileImage: selectedFile || undefined,
      });

      if (success) {
        setIsEditModalOpen(false);
        setSelectedFile(null);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (validateFile(file)) {
      setSelectedFile(file);
    } else {
      e.target.value = "";
    }
  };

  const openEditModal = () => {
    setEditName(userInfo?.fullName || "");
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-2xl">Thông tin tài khoản</h1>

      {/* Profile Section */}
      <div className="flex justify-between items-center bg-gray-50 p-4 pl-0 rounded-lg">
        <div className="flex flex-col items-start space-y-2">
          <h2 className="font-semibold text-xl">
            {userInfo?.fullName || "Chưa cập nhật"}
          </h2>
          <p className="text-gray-600">{userInfo?.email}</p>
        </div>
        <Button onClick={openEditModal}>Chỉnh sửa</Button>
      </div>

      {/* Profile Details */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Hồ sơ</h2>
        <div className="space-y-3">
          <div>
            <Label className="font-medium text-gray-700 text-sm">Email</Label>
            <p className="text-gray-900">{userInfo?.email}</p>
          </div>
          <Separator />
          <div>
            <Label className="font-medium text-gray-700 text-sm">
              Mật khẩu
            </Label>
            <p className="text-gray-900">********</p>
            <Button
              variant="link"
              onClick={onSwitchToPassword}
              className="p-0 h-auto"
            >
              Đổi mật khẩu
            </Button>
          </div>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Thông tin gói đăng ký</h2>
        {userInfo?.userSub ? (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">
                {userInfo.userSub.subscription?.nameSub || "PREMIUM"}
              </span>
            </div>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div className="space-y-1">
                <p className="font-medium text-gray-700 text-sm">
                  Ngày bắt đầu
                </p>
                <p className="text-gray-900">
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
              <div className="space-y-1">
                <p className="font-medium text-gray-700 text-sm">
                  Ngày hết hạn
                </p>
                <p className="text-gray-900">
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
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Trạng thái</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
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
          <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <p className="text-gray-600">Chưa có thông tin gói đăng ký</p>
            </div>
          </div>
        )}
      </div>

      {/* Connected Accounts */}
      <div className="space-y-4">
        <h2 className="font-semibold text-lg">Tài khoản đã liên kết</h2>
        <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
          <Globe className="w-5 h-5 text-blue-500" />
          <span className="font-medium">Google</span>
          <span className="text-gray-600">{userInfo?.email}</span>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cập nhật hồ sơ</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <div className="mt-2">
                <p className="mb-2 text-gray-500 text-xs">
                  Hỗ trợ định dạng JPG, GIF, PNG, kích thước tối đa 800KB.
                </p>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" size="sm" asChild>
                    <span>Tải lên ngay</span>
                  </Button>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="fullName">Tên hiển thị</Label>
              <Input
                id="fullName"
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="Nhập tên hiển thị"
                maxLength={50}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditModalOpen(false)}
                disabled={isSubmitting}
                className="flex-1"
              >
                Hủy bỏ
              </Button>
              <Button
                onClick={handleUpdateProfile}
                disabled={isSubmitting}
                className="flex-1"
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
