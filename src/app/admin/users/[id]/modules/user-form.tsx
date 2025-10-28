"use client";

import type { User, Subscription, UserSubscription } from "@/types";
import { useCallback, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseTextField } from "@/components/ui/base";
import { AdminContentCard, AdminPageLayout } from "@/components/admin";
import { FormActions } from "@/components/form-actions";
import { FormMode, BUTTON_TEXT } from "@/constants/common";
import { userFormSchema, type UserFormSchema } from "@/libs/form-schemas";
import { USERS_CONSTANTS } from "@/constants/users";
import { USER_ROLE_OPTIONS } from "@/types/enums";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface Props {
  readonly user?: User | null;
  readonly mode: FormMode;
  readonly onSave: (data: Partial<User>) => void;
  readonly onCancel: () => void;
  readonly isSaving?: boolean;
  readonly isLoading?: boolean;
  readonly subscriptions?: Subscription[];
  readonly isFetchingSubscriptions?: boolean;
}

export const UserForm = ({
  user,
  mode,
  onSave,
  onCancel,
  isSaving = false,
  isLoading = false,
  subscriptions = [],
  isFetchingSubscriptions = false,
}: Props): React.JSX.Element => {
  const isCreateMode = mode === FormMode.CREATE;

  // Calculate default values based on user data
  const getDefaultValues = useCallback((): UserFormSchema => {
    if (user) {
      return {
        fullName: user.fullName || "",
        email: user.email || "",
        role: user.role ?? USERS_CONSTANTS.ROLE.USER,
        accountStatus:
          (user as any).accountStatus ?? USERS_CONSTANTS.STATUS.ACTIVE,
        // Subscription fields
        subscriptionId: user.userSub?.subscription?.id
          ? Number(user.userSub.subscription.id)
          : undefined,
        subscriptionStartDate: user.userSub?.startDate
          ? user.userSub.startDate.split("T")[0]
          : "",
        subscriptionEndDate: user.userSub?.endDate
          ? user.userSub.endDate.split("T")[0]
          : "",
        subscriptionTokens: user.userSub?.token ?? 0,
        countPrompt: (user as any).countPrompt ?? 0,
      };
    }
    return {
      fullName: "",
      email: "",
      role: USERS_CONSTANTS.ROLE.USER,
      accountStatus: USERS_CONSTANTS.STATUS.ACTIVE,
      // Subscription fields
      subscriptionId: undefined,
      subscriptionStartDate: "",
      subscriptionEndDate: "",
      subscriptionTokens: 0,
      countPrompt: 0,
    };
  }, [user]);

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: getDefaultValues(),
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = form;

  // Update form when user changes
  useEffect(() => {
    if (user) {
      const defaultValues = getDefaultValues();
      Object.entries(defaultValues).forEach(([key, value]) => {
        setValue(key as keyof UserFormSchema, value);
      });
    }
  }, [user, setValue, getDefaultValues]);

  const isDisabled = useMemo(() => {
    return isSaving || !isDirty;
  }, [isSaving, isDirty]);

  const onSubmit = useCallback(
    async (data: UserFormSchema) => {
      const userData: Partial<User> = {
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        accountStatus: data.accountStatus,
        countPromt: data.countPrompt,
      };

      // Add subscription data if provided
      if (
        data.subscriptionStartDate ||
        data.subscriptionEndDate ||
        data.subscriptionTokens !== undefined
      ) {
        userData.userSub = {
          subscriptionId: data.subscriptionId,
          startDate: data.subscriptionStartDate
            ? new Date(data.subscriptionStartDate).toISOString()
            : "",
          endDate: data.subscriptionEndDate
            ? new Date(data.subscriptionEndDate).toISOString()
            : "",
          token: data.subscriptionTokens,
        } as UserSubscription;
      }

      onSave(userData);
    },
    [onSave]
  );

  const formButtonText = isSaving
    ? mode === FormMode.CREATE
      ? BUTTON_TEXT.CREATING
      : BUTTON_TEXT.SAVING
    : mode === FormMode.CREATE
      ? BUTTON_TEXT.CREATE
      : BUTTON_TEXT.EDIT;

  if (isLoading) {
    return (
      <AdminPageLayout
        title={isCreateMode ? "Tạo người dùng mới" : "Chỉnh sửa người dùng"}
        description={
          isCreateMode
            ? "Tạo tài khoản người dùng mới trong hệ thống"
            : user?.fullName
        }
        showActionBottom
      >
        <div className="space-y-6">
          <div className="bg-gray-200 rounded w-full h-64 animate-pulse" />
          <div className="bg-gray-200 rounded w-full h-32 animate-pulse" />
        </div>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title={isCreateMode ? "Tạo người dùng mới" : "Chỉnh sửa người dùng"}
      description={
        isCreateMode
          ? "Tạo tài khoản người dùng mới trong hệ thống"
          : user?.fullName
      }
      actions={
        <FormActions
          onCancelAction={onCancel}
          isSaving={isSaving}
          isDisabled={isDisabled}
          cancelText={BUTTON_TEXT.CANCEL}
          saveText={formButtonText}
          formId="user-form"
        />
      }
      showActionBottom
    >
      <Form {...form}>
        <form
          id="user-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Basic Information */}
          <AdminContentCard>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">
                Thông tin cơ bản
                <span className="text-red-500">*</span>
              </h3>
            </div>

            <div className="space-y-4">
              {/* Full Name */}
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <BaseTextField
                    id="fullName"
                    label="Họ và tên"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Nhập họ và tên"
                    required
                    error={errors.fullName?.message}
                  />
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <BaseTextField
                    id="email"
                    label="Email"
                    type="email"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Nhập địa chỉ email"
                    required
                    error={errors.email?.message}
                  />
                )}
              />

              {/* Role and Status Row */}
              <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label className="font-medium text-sm">
                        Vai trò
                        <span className="ml-1 text-red-500">*</span>
                      </Label>
                      <select
                        {...field}
                        value={field.value}
                        onChange={e => field.onChange(Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-10"
                      >
                        {USER_ROLE_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.role && (
                        <p className="text-red-500 text-sm">
                          {errors.role.message}
                        </p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  name="accountStatus"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label className="font-medium text-sm">
                        Trạng thái
                        <span className="ml-1 text-red-500">*</span>
                      </Label>
                      <select
                        {...field}
                        value={field.value}
                        onChange={e => field.onChange(Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-10"
                      >
                        <option value={USERS_CONSTANTS.STATUS.ACTIVE}>
                          Hoạt động
                        </option>
                        <option value={USERS_CONSTANTS.STATUS.INACTIVE}>
                          Không hoạt động
                        </option>
                        <option value={USERS_CONSTANTS.STATUS.PENDING}>
                          Chờ xử lý
                        </option>
                      </select>
                      {errors.accountStatus && (
                        <p className="text-red-500 text-sm">
                          {errors.accountStatus.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
            </div>
          </AdminContentCard>

          {/* Additional Information (Read-only) */}
          {user && (
            <AdminContentCard>
              <div className="mb-4">
                <h3 className="font-semibold text-lg">Thông tin bổ sung</h3>
              </div>

              <div className="space-y-4">
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  {/* User ID */}
                  <div className="space-y-2">
                    <Label className="font-medium text-sm">ID người dùng</Label>
                    <Input
                      value={user.id || ""}
                      disabled
                      className="bg-gray-50 w-full"
                    />
                  </div>
                </div>

                <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                  {/* Created At */}
                  <div className="space-y-2">
                    <Label className="font-medium text-sm">Ngày tạo</Label>
                    <Input
                      value={
                        user.createdAt
                          ? new Date(user.createdAt).toLocaleString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: false,
                            })
                          : ""
                      }
                      disabled
                      className="bg-gray-50 w-full"
                    />
                  </div>

                  {/* Updated At */}
                  <div className="space-y-2">
                    <Label className="font-medium text-sm">Ngày cập nhật</Label>
                    <Input
                      value={
                        user.updatedAt
                          ? new Date(user.updatedAt).toLocaleString("vi-VN", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: false,
                            })
                          : ""
                      }
                      disabled
                      className="bg-gray-50 w-full"
                    />
                  </div>
                </div>

                {/* Permissions */}
                {user.permissions && (
                  <div className="space-y-2">
                    <Label className="font-medium text-sm">Quyền hạn</Label>
                    <div className="flex flex-wrap gap-2">
                      {(Array.isArray(user.permissions)
                        ? user.permissions
                        : [user.permissions]
                      ).map((permission: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-100 px-2 py-1 rounded-md text-blue-800 text-xs"
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subscription Info - Editable */}
                {(user?.userSub || !isCreateMode) && (
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-sm">
                      Thông tin gói đăng ký
                    </h4>

                    {/* Subscription Plan Info (Read-only) */}
                    {user?.userSub?.subscription && (
                      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label className="font-medium text-xs">
                            Gói đang sử dụng
                          </Label>
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
                                  }).format(
                                    Number(user.userSub.subscription.price)
                                  )
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
                            <Label className="font-medium text-xs">
                              Gói đăng ký
                            </Label>
                            <select
                              {...field}
                              value={field.value || ""}
                              onChange={e =>
                                field.onChange(
                                  Number(e.target.value) || undefined
                                )
                              }
                              className="bg-white px-3 py-2 border border-gray-300 focus:border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
                              disabled={isFetchingSubscriptions}
                            >
                              <option value="">Chọn gói đăng ký</option>
                              {subscriptions.map(subscription => (
                                <option
                                  key={subscription.id}
                                  value={subscription.id}
                                >
                                  {(subscription as any).nameSub ||
                                    subscription.name}{" "}
                                  -{" "}
                                  {subscription.price
                                    ? new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      }).format(Number(subscription.price))
                                    : "0₫"}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      />
                      <Controller
                        name="countPrompt"
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-2">
                            <Label className="font-medium text-xs">
                              Số prompt đã tạo
                            </Label>
                            <Input
                              {...field}
                              type="number"
                              min="0"
                              value={field.value || 0}
                              onChange={e =>
                                field.onChange(Number(e.target.value))
                              }
                              className="bg-white w-full text-sm"
                            />
                          </div>
                        )}
                      />
                      <Controller
                        name="subscriptionStartDate"
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-2">
                            <Label className="font-medium text-xs">
                              Ngày bắt đầu
                            </Label>
                            <div className="relative">
                              <Input
                                {...field}
                                type="date"
                                className="bg-white w-full text-sm"
                              />
                            </div>
                          </div>
                        )}
                      />
                      <Controller
                        name="subscriptionEndDate"
                        control={control}
                        render={({ field }) => (
                          <div className="space-y-2">
                            <Label className="font-medium text-xs">
                              Ngày kết thúc
                            </Label>
                            <div className="relative">
                              <Input
                                {...field}
                                type="date"
                                className="bg-white w-full text-sm"
                              />
                            </div>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>
            </AdminContentCard>
          )}
        </form>
      </Form>
    </AdminPageLayout>
  );
};
