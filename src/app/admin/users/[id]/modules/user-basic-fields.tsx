"use client";
import { Controller, type Control, type FieldErrors } from "react-hook-form";

import type { UserFormSchema } from "@/libs/form-schemas";
import { BaseTextField } from "@/components/ui/base";
import { Label } from "@/components/ui/label";
import { USER_ROLE_OPTIONS } from "@/types/enums";
import { USERS_CONSTANTS } from "@/constants/users";

interface Props {
  readonly control: Control<UserFormSchema>;
  readonly errors: FieldErrors<UserFormSchema>;
}

export function UserBasicFields({ control, errors }: Props): React.JSX.Element {
  return (
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
                <p className="text-red-500 text-sm">{errors.role.message}</p>
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
                <option value={USERS_CONSTANTS.STATUS.ACTIVE}>Hoạt động</option>
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
  );
}
