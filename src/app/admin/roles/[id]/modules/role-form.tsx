"use client";

import type { Role } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminContentCard, AdminPageLayout } from "@/components/admin";
import { FormActions } from "@/components/form-actions";
import { FormMode, BUTTON_TEXT } from "@/constants/common";
import {
  roleFormSchema,
  defaultRoleFormValues,
  type RoleFormSchema,
} from "@/libs/form-schemas/role-schema";
import { ROLE_CONSTANTS } from "@/constants/roles";

export interface RoleFormProps {
  readonly role?: Role | null;
  readonly mode: FormMode;
  readonly onSave: (data: Partial<Role>) => void;
  readonly onCancel: () => void;
  readonly isSaving?: boolean;
  readonly pageTitle?: string;
  readonly pageDescription?: string;
}

export const RoleForm = ({
  role,
  mode,
  onSave,
  onCancel,
  isSaving = false,
  pageTitle,
  pageDescription,
}: RoleFormProps): React.JSX.Element => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const isCreateMode = mode === FormMode.CREATE;

  // Calculate default values based on role data
  const getDefaultValues = useCallback((): RoleFormSchema => {
    if (role) {
      return {
        id: role.id,
        name: role.name || "",
        description: role.description || "",
        permissions: role.permissions || [],
      };
    }
    return defaultRoleFormValues;
  }, [role]);

  const form = useForm<RoleFormSchema>({
    resolver: zodResolver(roleFormSchema),
    defaultValues: getDefaultValues(),
  });

  // Update form values when role data changes
  useEffect(() => {
    if (role) {
      const defaultValues = getDefaultValues();
      form.reset(defaultValues);
      setSelectedPermissions(defaultValues.permissions);
    }
  }, [role, form, getDefaultValues]);

  const handlePermissionToggle = (permission: string, checked: boolean) => {
    const newPermissions = checked
      ? [...selectedPermissions, permission]
      : selectedPermissions.filter(p => p !== permission);

    setSelectedPermissions(newPermissions);
    form.setValue("permissions", newPermissions);
  };

  const onSubmit = useCallback(
    async (data: RoleFormSchema) => {
      onSave({
        id: data.id,
        name: data.name,
        description: data.description,
        permissions: selectedPermissions,
      });
    },
    [onSave, selectedPermissions]
  );

  const permissions = useMemo(() => ROLE_CONSTANTS.PERMISSIONS, []);

  return (
    <AdminPageLayout
      title={pageTitle || ""}
      description={pageDescription || ""}
      actions={
        <FormActions
          onCancelAction={onCancel}
          isSaving={isSaving}
          isDisabled={isSaving}
          cancelText={BUTTON_TEXT.CANCEL}
          saveText={isCreateMode ? BUTTON_TEXT.CREATE : BUTTON_TEXT.EDIT}
          formId="role-form"
        />
      }
    >
      <AdminContentCard>
        <Form {...form}>
          <form
            id="role-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cơ bản</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên vai trò *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tên vai trò" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Nhập mô tả vai trò"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Permissions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quyền hạn truy cập</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-[400px] overflow-y-auto">
                    {permissions.map(permission => (
                      <div
                        key={permission}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`permission-${permission}`}
                          checked={selectedPermissions.includes(permission)}
                          onCheckedChange={checked =>
                            handlePermissionToggle(
                              permission,
                              checked as boolean
                            )
                          }
                        />
                        <label
                          htmlFor={`permission-${permission}`}
                          className="font-medium text-sm capitalize cursor-pointer"
                        >
                          {permission.replace(/_/g, " ")}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Đã chọn: {selectedPermissions.length}/{permissions.length}{" "}
                    quyền
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </AdminContentCard>
    </AdminPageLayout>
  );
};
