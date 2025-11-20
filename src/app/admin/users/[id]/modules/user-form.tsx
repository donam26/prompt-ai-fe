"use client";

import type { User, Subscription, UserSubscription } from "@/types";
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdminContentCard, AdminPageLayout } from "@/components/admin";
import { FormActions } from "@/components/form-actions";
import { FormMode, BUTTON_TEXT } from "@/constants/common";
import { userFormSchema, type UserFormSchema } from "@/libs/form-schemas";
import { USERS_CONSTANTS } from "@/constants/users";
import { Form } from "@/components/ui/form";
import {
  UserBasicFields,
  UserAdditionalInfo,
  UserSubscriptionFields,
} from "./";

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

  const formButtonText = useMemo(() => {
    if (isSaving) {
      return mode === FormMode.CREATE
        ? BUTTON_TEXT.CREATING
        : BUTTON_TEXT.SAVING;
    }
    return isCreateMode ? BUTTON_TEXT.CREATE : BUTTON_TEXT.EDIT;
  }, [isSaving, mode, isCreateMode]);

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
            <UserBasicFields control={control} errors={errors} />
          </AdminContentCard>

          {/* Additional Information (Read-only) */}
          {user && (
            <AdminContentCard>
              <div className="mb-4">
                <h3 className="font-semibold text-lg">Thông tin bổ sung</h3>
              </div>
              <UserAdditionalInfo user={user} />
              {/* Subscription Info - Editable */}
              <div className="mt-4">
                <UserSubscriptionFields
                  control={control}
                  errors={errors}
                  user={user}
                  subscriptions={subscriptions}
                  isFetchingSubscriptions={isFetchingSubscriptions}
                  isCreateMode={isCreateMode}
                />
              </div>
            </AdminContentCard>
          )}
        </form>
      </Form>
    </AdminPageLayout>
  );
};
