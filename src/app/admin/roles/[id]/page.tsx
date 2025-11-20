"use client";

import type { Role } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";
import { useRole, useCreateRole, useUpdateRole } from "@/hooks";
import { FormSkeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/toast";
import { ROLE_CONSTANTS } from "@/constants/roles";
import { FormMode } from "@/constants/common";
import { RoleForm, RoleUsers } from "./modules";

export default function RoleDetailsPage() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

  const formMode = id === "create" ? FormMode.CREATE : FormMode.EDIT;
  const isCreateMode = formMode === FormMode.CREATE;
  const roleIdToUpdate = isCreateMode ? undefined : id;

  const {
    role: roleData,
    isLoading,
    error: roleDetailError,
  } = useRole({ id: roleIdToUpdate, enabled: !isCreateMode });

  const { mutate: createRole, isLoading: isCreating } = useCreateRole();
  const { mutate: updateRole, isLoading: isUpdating } = useUpdateRole({
    id: roleIdToUpdate || "",
  });

  const handleSave = useCallback(
    async (data: Partial<Role>) => {
      let result: boolean;

      if (isCreateMode) {
        result = await createRole({
          name: data.name || "",
          description: data.description || "",
          permissions: data.permissions || [],
        });
      } else {
        result = await updateRole({
          name: data.name || "",
          description: data.description || "",
          permissions: data.permissions || [],
        });
      }

      if (result) {
        showToast.success(
          roleIdToUpdate
            ? ROLE_CONSTANTS.MESSAGES.UPDATE_SUCCESS
            : ROLE_CONSTANTS.MESSAGES.CREATE_SUCCESS
        );
        router.push(ROLE_CONSTANTS.ROUTES.ROLES);
      } else {
        showToast.error(
          roleIdToUpdate
            ? "Có lỗi xảy ra khi cập nhật vai trò"
            : "Có lỗi xảy ra khi tạo vai trò"
        );
      }
    },
    [isCreateMode, createRole, updateRole, roleIdToUpdate, router]
  );

  const handleCancel = useCallback(() => {
    router.push(ROLE_CONSTANTS.ROUTES.ROLES);
  }, [router]);

  // Handle errors
  useEffect(() => {
    if (roleDetailError) {
      showToast.error("Có lỗi xảy ra khi tải thông tin vai trò");
    }
  }, [roleDetailError]);

  const isUpserting = isCreating || isUpdating;

  const pageTitle = useMemo(() => {
    return isCreateMode ? "Tạo vai trò mới" : "Chỉnh sửa vai trò";
  }, [isCreateMode]);

  const pageDescription = useMemo(() => {
    return isCreateMode
      ? "Tạo vai trò mới với các quyền hạn phù hợp"
      : `Chỉnh sửa thông tin vai trò ${roleData?.name || ""}`;
  }, [isCreateMode, roleData]);

  const defaultRole: Role = useMemo(
    () => ({
      id: "",
      name: "",
      description: "",
      permissions: [],
      createdAt: "",
      updatedAt: "",
      isActive: true,
    }),
    []
  );

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (!isCreateMode && !roleData) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-2 font-bold text-2xl">Vai trò không tồn tại</h2>
        <p className="mb-4 text-muted-foreground">
          Vai trò bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
      </div>
    );
  }

  if (isCreateMode) {
    return (
      <RoleForm
        role={defaultRole}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isUpserting}
        mode={formMode}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />
    );
  }

  return (
    <div className="space-y-6">
      <RoleForm
        role={roleData || defaultRole}
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isUpserting}
        mode={formMode}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />
      {roleData && <RoleUsers roleId={roleData.id} roleName={roleData.name} />}
    </div>
  );
}
