"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  industrySchema,
  type IndustryFormData,
} from "@/libs/form-schemas/industry-schema";
import type { Industry } from "@/types";

interface IndustryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  industry: Industry | null;
  onSave: (data: IndustryFormData) => Promise<void>;
  isLoading?: boolean;
}

export const IndustryEditModal = ({
  isOpen,
  onClose,
  industry,
  onSave,
  isLoading = false,
}: IndustryEditModalProps): React.JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IndustryFormData>({
    resolver: zodResolver(industrySchema),
    defaultValues: {
      name: "",
      description: "",
      status: "active",
    },
  });

  // Reset form when industry changes
  useEffect(() => {
    if (industry) {
      setValue("name", industry.name || "");
      setValue("description", industry.description || "");
    } else {
      reset();
    }
  }, [industry, setValue, reset]);

  const handleFormSubmit = async (data: IndustryFormData) => {
    try {
      setIsSubmitting(true);
      await onSave(data);
      onClose();
    } catch (error) {
      console.error("Error saving industry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Building2 className="w-5 h-5 text-blue-600" />
            {industry ? "Chỉnh sửa ngành nghề" : "Thêm ngành nghề mới"}
          </DialogTitle>
          <DialogDescription>
            {industry
              ? "Cập nhật thông tin ngành nghề"
              : "Điền thông tin để tạo ngành nghề mới"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium text-sm">
                Tên ngành nghề <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Nhập tên ngành nghề"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description" className="font-medium text-sm">
                Mô tả <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Nhập mô tả ngành nghề"
                rows={4}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting || isLoading}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSubmitting || isLoading
                ? "Đang lưu..."
                : industry
                  ? "Cập nhật"
                  : "Tạo mới"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
