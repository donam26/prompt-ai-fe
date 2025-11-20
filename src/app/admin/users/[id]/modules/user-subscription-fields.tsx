"use client";

import { Controller, type Control, type FieldErrors } from "react-hook-form";

import type { UserFormSchema } from "@/libs/form-schemas";
import type { User, Subscription } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  readonly control: Control<UserFormSchema>;
  readonly errors: FieldErrors<UserFormSchema>;
  readonly user?: User | null;
  readonly subscriptions?: Subscription[];
  readonly isFetchingSubscriptions?: boolean;
  readonly isCreateMode: boolean;
}

export function UserSubscriptionFields({
  control,
  errors,
  user,
  subscriptions = [],
  isFetchingSubscriptions = false,
  isCreateMode,
}: Props): React.JSX.Element | null {
  if (!user?.userSub && isCreateMode) {
    return null;
  }

  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium text-sm">Thông tin gói đăng ký</h4>

      {/* Subscription Plan Info (Read-only) */}
      {user?.userSub?.subscription && (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-medium text-xs">Gói đang sử dụng</Label>
            <Input
              value={
                (user.userSub.subscription as any).nameSub ||
                (user.userSub.subscription as any).name ||
                ""
              }
              disabled
              className="bg-white w-full text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-medium text-xs">Giá</Label>
            <Input
              value={
                user.userSub.subscription.price
                  ? new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(Number(user.userSub.subscription.price))
                  : "0₫"
              }
              disabled
              className="bg-white w-full text-sm"
            />
          </div>
        </div>
      )}

      {/* Editable Subscription Fields */}
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Controller
          name="subscriptionId"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label className="font-medium text-xs">Gói đăng ký</Label>
              <select
                {...field}
                value={field.value || ""}
                onChange={e =>
                  field.onChange(Number(e.target.value) || undefined)
                }
                className="bg-white px-3 py-2 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
                disabled={isFetchingSubscriptions}
              >
                <option value="">Chọn gói đăng ký</option>
                {subscriptions.map(subscription => (
                  <option key={subscription.id} value={subscription.id}>
                    {(subscription as any).nameSub || subscription.name} -{" "}
                    {subscription.price
                      ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(Number(subscription.price))
                      : "0₫"}
                  </option>
                ))}
              </select>
              {errors.subscriptionId && (
                <p className="text-red-500 text-sm">
                  {errors.subscriptionId.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="countPrompt"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label className="font-medium text-xs">Số prompt đã tạo</Label>
              <Input
                {...field}
                type="number"
                min="0"
                value={field.value || 0}
                onChange={e => field.onChange(Number(e.target.value))}
                className="bg-white w-full text-sm"
              />
              {errors.countPrompt && (
                <p className="text-red-500 text-sm">
                  {errors.countPrompt.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="subscriptionStartDate"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label className="font-medium text-xs">Ngày bắt đầu</Label>
              <Input
                {...field}
                type="date"
                className="bg-white w-full text-sm"
              />
              {errors.subscriptionStartDate && (
                <p className="text-red-500 text-sm">
                  {errors.subscriptionStartDate.message}
                </p>
              )}
            </div>
          )}
        />
        <Controller
          name="subscriptionEndDate"
          control={control}
          render={({ field }) => (
            <div className="space-y-2">
              <Label className="font-medium text-xs">Ngày kết thúc</Label>
              <Input
                {...field}
                type="date"
                className="bg-white w-full text-sm"
              />
              {errors.subscriptionEndDate && (
                <p className="text-red-500 text-sm">
                  {errors.subscriptionEndDate.message}
                </p>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
