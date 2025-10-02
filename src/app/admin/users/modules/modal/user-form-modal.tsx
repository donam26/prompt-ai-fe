"use client";

import React from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BaseSelect } from "@/components/ui/base-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { UserFormData } from "@/types/admin/user";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingUser?: any;
  formData: UserFormData;
  onFormDataChange: (key: keyof UserFormData, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const UserFormModal = ({
  isOpen,
  onOpenChange,
  editingUser,
  formData,
  onFormDataChange,
  onSubmit,
}: Props): React.JSX.Element => {
  const handleFormDataChange = (
    field: keyof UserFormData,
    value: string | boolean
  ): void => {
    onFormDataChange(field, value as string);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit();
  };

  const handleClose = (): void => {
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>
              {editingUser ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="p-0 w-8 h-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <UserFormFields
            formData={formData}
            onFormDataChange={handleFormDataChange}
          />

          <UserFormActions onReset={handleClose} editingUser={editingUser} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

/**
 * User form fields component
 *
 * @param props - The component props
 * @returns The user form fields JSX
 */
const UserFormFields = ({
  formData,
  onFormDataChange,
}: {
  formData: UserFormData;
  onFormDataChange: (
    field: keyof UserFormData,
    value: string | boolean
  ) => void;
}): React.JSX.Element => (
  <div className="space-y-4">
    {/* Name and Email */}
    <div className="gap-4 grid grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-medium">
          Tên người dùng *
        </Label>
        <Input
          id="name"
          type="text"
          value={formData.fullName}
          onChange={e => onFormDataChange("fullName", e.target.value)}
          placeholder="Nhập tên người dùng"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="font-medium">
          Email *
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={e => onFormDataChange("email", e.target.value)}
          placeholder="Nhập email"
          required
        />
      </div>
    </div>

    {/* Role and Status */}
    <div className="gap-4 grid grid-cols-2">
      <div className="space-y-2">
        <Label className="font-medium">Vai trò *</Label>
        <RoleSelect
          value={formData.role}
          onChange={value => onFormDataChange("role", value)}
        />
      </div>

      <div className="space-y-2">
        <Label className="font-medium">Trạng thái *</Label>
        <StatusSelect
          value={formData.status}
          onChange={value => onFormDataChange("status", value)}
        />
      </div>
    </div>

    {/* Phone and Avatar */}
    <div className="gap-4 grid grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="phone" className="font-medium">
          Số điện thoại
        </Label>
        <Input
          id="phone"
          type="tel"
          value=""
          onChange={() => {}}
          placeholder="Nhập số điện thoại"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="avatar" className="font-medium">
          URL ảnh đại diện
        </Label>
        <Input
          id="avatar"
          type="url"
          value=""
          onChange={() => {}}
          placeholder="Nhập URL ảnh đại diện"
        />
      </div>
    </div>
  </div>
);

/**
 * Role select component
 *
 * @param props - The component props
 * @returns The role select JSX
 */
const RoleSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element => {
  const roleOptions = [
    { id: "user", name: "Người dùng" },
    { id: "moderator", name: "Điều hành viên" },
    { id: "admin", name: "Quản trị viên" },
  ];

  return (
    <BaseSelect
      items={roleOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Chọn vai trò..."
      className="w-full"
    />
  );
};

/**
 * Status select component
 *
 * @param props - The component props
 * @returns The status select JSX
 */
const StatusSelect = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}): React.JSX.Element => {
  const statusOptions = [
    { id: "active", name: "Hoạt động" },
    { id: "inactive", name: "Không hoạt động" },
    { id: "suspended", name: "Bị đình chỉ" },
  ];

  return (
    <BaseSelect
      items={statusOptions}
      value={value}
      onValueChange={onChange}
      placeholder="Chọn trạng thái..."
      className="w-full"
    />
  );
};

/**
 * User form actions component
 *
 * @param props - The component props
 * @returns The user form actions JSX
 */
const UserFormActions = ({
  onReset,
  editingUser,
}: {
  onReset: () => void;
  editingUser: any;
}): React.JSX.Element => (
  <div className="flex justify-end gap-3 pt-4 border-t">
    <Button type="button" variant="outline" onClick={onReset}>
      Hủy
    </Button>
    <Button
      type="submit"
      className="bg-primary-600 hover:bg-primary-700 text-white"
    >
      {editingUser ? "Cập nhật" : "Tạo mới"}
    </Button>
  </div>
);
