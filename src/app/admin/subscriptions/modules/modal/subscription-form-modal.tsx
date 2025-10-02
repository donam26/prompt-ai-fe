"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SubscriptionFormModalProps } from "@/types/admin/subscription";
import {
  subscriptionFormSchema,
  getSubscriptionFormDefaultValues,
} from "@/libs/form-schemas";

export const SubscriptionFormModal = ({
  subscription,
  onSubmit,
  onCancel,
  isLoading = false,
  errors = {},
  isOpen = false,
}: SubscriptionFormModalProps): React.JSX.Element => {
  const isEditMode = Boolean(subscription);

  const form = useForm({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues: getSubscriptionFormDefaultValues(subscription),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = form;

  useEffect(() => {
    if (subscription) {
      reset(getSubscriptionFormDefaultValues(subscription));
    } else {
      reset(getSubscriptionFormDefaultValues());
    }
  }, [subscription, reset]);

  const handleFormSubmit = (data: any) => {
    onSubmit(data);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Chỉnh sửa gói đăng ký" : "Thêm gói đăng ký mới"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Cập nhật thông tin gói đăng ký"
              : "Nhập thông tin để tạo gói đăng ký mới"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Tên gói */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Tên gói <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="name_sub"
                  placeholder="Nhập tên gói đăng ký"
                  className="w-full"
                />
              )}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name.message}</p>
            )}
            {errors.name_sub && (
              <p className="text-red-500 text-sm">{errors.name_sub}</p>
            )}
          </div>

          {/* Mô tả */}
          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Nhập mô tả gói đăng ký"
                  className="w-full min-h-[100px]"
                />
              )}
            />
            {formErrors.description && (
              <p className="text-red-500 text-sm">
                {formErrors.description.message}
              </p>
            )}
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description}</p>
            )}
          </div>

          {/* Giá và Số token */}
          <div className="gap-4 grid grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">
                Giá tiền (VND) <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="price"
                    type="number"
                    min="0"
                    placeholder="0"
                    onChange={e => field.onChange(Number(e.target.value))}
                    className="w-full"
                  />
                )}
              />
              {formErrors.price && (
                <p className="text-red-500 text-sm">
                  {formErrors.price.message}
                </p>
              )}
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">
                Số token <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="duration"
                    type="number"
                    min="1"
                    placeholder="1"
                    onChange={e => field.onChange(Number(e.target.value))}
                    className="w-full"
                  />
                )}
              />
              {formErrors.duration && (
                <p className="text-red-500 text-sm">
                  {formErrors.duration.message}
                </p>
              )}
              {errors.duration && (
                <p className="text-red-500 text-sm">{errors.duration}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? isEditMode
                  ? "Đang cập nhật..."
                  : "Đang tạo..."
                : isEditMode
                  ? "Cập nhật"
                  : "Tạo mới"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
