"use client";

import type { User } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useUserDetail, useUpsertUser } from "@/hooks/admin/useUser";
import { useSubscriptions } from "@/hooks/admin/useSubscription";
import { FormSkeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/toast";
import { USERS_CONSTANTS } from "@/constants/users";
import { FormMode } from "@/constants/common";
import { UserForm } from "./modules/user-form";

export default function UserEditPage(): React.JSX.Element {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

  const formMode = id === "create" ? FormMode.CREATE : FormMode.EDIT;
  const isCreateMode = formMode === FormMode.CREATE;
  const userIdToUpdate = isCreateMode ? undefined : id;

  const {
    user: userData,
    isLoading,
    error: userDetailError,
  } = useUserDetail(userIdToUpdate);
  const {
    mutate: upsertUser,
    isUpserting,
    error: upsertUserError,
  } = useUpsertUser();

  // Fetch subscriptions for user subscription management
  const {
    subscriptions,
    isFetching: isFetchingSubscriptions,
    error: subscriptionsError,
  } = useSubscriptions({
    pagination: { pageIndex: 0, pageSize: 100 }, // Get all subscriptions
  });

  const handleSave = useCallback(
    async (data: Partial<User>) => {
      console.log("handleSave called with data:", data);
      console.log("userIdToUpdate:", userIdToUpdate);

      const result = await upsertUser(data, userIdToUpdate);
      console.log("upsertUser result:", result);

      if (result) {
        showToast.success(
          userIdToUpdate
            ? "Người dùng đã được cập nhật thành công"
            : "Người dùng đã được tạo thành công"
        );
        router.push(USERS_CONSTANTS.ROUTES.USERS);
      } else {
        showToast.error("Có lỗi xảy ra khi lưu thông tin người dùng");
      }
    },
    [userIdToUpdate, upsertUser, router]
  );

  const handleCancel = useCallback(() => {
    router.push(USERS_CONSTANTS.ROUTES.USERS);
  }, [router]);

  useEffect(() => {
    const errorMessage =
      userDetailError || upsertUserError || subscriptionsError;
    if (!errorMessage) {
      return;
    }
    showToast.error(errorMessage);
    if (userDetailError) {
      router.push(USERS_CONSTANTS.ROUTES.USERS);
    }
  }, [userDetailError, upsertUserError, subscriptionsError, router]);

  if (isLoading) {
    return <FormSkeleton />;
  }

  return (
    <UserForm
      user={userData}
      mode={formMode}
      onSave={handleSave}
      onCancel={handleCancel}
      isSaving={isUpserting}
      isLoading={isLoading}
      subscriptions={subscriptions}
      isFetchingSubscriptions={isFetchingSubscriptions}
    />
  );
}
