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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MultiSelect } from "@/components/ui/multi-select";
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

  const permissions = useMemo(() => ROLE_CONSTANTS.PERMISSIONS, []);

  // Normalize permission from snake_case to camelCase
  const normalizePermission = useCallback((permission: string): string => {
    const permissionMap: Record<string, string> = {
      blog_category: "blogCategory",
      send_mail: "sendMail",
      upload_word: "uploadWord",
    };
    return permissionMap[permission] || permission;
  }, []);

  // Filter and normalize selected permissions to only include valid ones
  const validSelectedPermissions = useMemo(() => {
    const permissionsSet = new Set(permissions);
    return selectedPermissions
      .map(p => normalizePermission(p))
      .filter(p => permissionsSet.has(p as (typeof permissions)[number]));
  }, [selectedPermissions, permissions, normalizePermission]);

  // Update form values when role data changes
  useEffect(() => {
    if (role) {
      const defaultValues = getDefaultValues();
      form.reset(defaultValues);
      // Normalize and filter permissions to only include valid ones
      const permissionsSet = new Set(permissions);
      const normalizedPermissions = (defaultValues.permissions || [])
        .map(p => normalizePermission(p))
        .filter(p => permissionsSet.has(p as (typeof permissions)[number]));
      setSelectedPermissions(normalizedPermissions);
      form.setValue("permissions", normalizedPermissions);
    }
  }, [role, form, getDefaultValues, permissions, normalizePermission]);

  const onSubmit = useCallback(
    async (data: RoleFormSchema) => {
      onSave({
        id: data.id,
        name: data.name,
        description: data.description,
        permissions: validSelectedPermissions,
      });
    },
    [onSave, validSelectedPermissions]
  );

  // Convert permissions to MultiSelect options
  const permissionOptions = useMemo(() => {
    return permissions.map(permission => {
      // Format permission name: camelCase -> "Camel Case", snake_case -> "Snake Case"
      let formattedLabel = permission.replaceAll("_", " ");
      // Add space before capital letters
      const parts: string[] = [];
      let currentPart = "";
      for (const char of formattedLabel) {
        if (char >= "A" && char <= "Z" && currentPart) {
          parts.push(currentPart);
          currentPart = char;
        } else {
          currentPart += char;
        }
      }
      if (currentPart) {
        parts.push(currentPart);
      }
      formattedLabel = parts.join(" ");
      // Capitalize first letter
      formattedLabel =
        formattedLabel.charAt(0).toUpperCase() + formattedLabel.slice(1).trim();

      return {
        label: formattedLabel,
        value: permission,
      };
    });
  }, [permissions]);

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
                <CardHeader className="px-6">
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
                  <CardTitle className="px-6">Quyền hạn truy cập</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="permissions"
                    render={() => (
                      <FormItem>
                        <FormLabel>Chọn quyền hạn</FormLabel>
                        <FormControl>
                          <MultiSelect
                            options={permissionOptions}
                            value={validSelectedPermissions}
                            onValueChange={values => {
                              // Filter to only include valid permissions
                              const permissionsSet = new Set(permissions);
                              const validValues = values.filter(v =>
                                permissionsSet.has(
                                  v as (typeof permissions)[number]
                                )
                              );
                              setSelectedPermissions(validValues);
                              form.setValue("permissions", validValues);
                            }}
                            placeholder="Chọn quyền hạn..."
                            maxCount={5}
                          />
                        </FormControl>
                        <div className="text-muted-foreground text-sm">
                          Đã chọn: {validSelectedPermissions.length}/
                          {permissions.length} quyền
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </AdminContentCard>
    </AdminPageLayout>
  );
};
