"use client";

import { useState, useCallback } from "react";
import { userService } from "@/services";
import { showToast } from "@/components/ui/toast";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface UseChangePasswordOptions {
  userId: string | number;
}

export const useChangePassword = (options: UseChangePasswordOptions) => {
  const { userId } = options;

  // State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Change password
  const changePassword = useCallback(
    async (data: ChangePasswordData) => {
      if (!userId) return false;

      setIsLoading(true);
      setError("");

      try {
        const response = await userService.changePassword(
          userId,
          data.currentPassword,
          data.newPassword
        );

        if (response.status === 200 && response.data?.type === 2) {
          showToast.success(
            response.data?.message || "Đổi mật khẩu thành công"
          );
          return true;
        } else if (response.status === 200 && response.data?.type === 1) {
          const errorMessage =
            response.data?.message || "Mật khẩu hiện tại không đúng";
          setError(errorMessage);
          showToast.error(errorMessage);
          return false;
        } else {
          const errorMessage = "Đổi mật khẩu thất bại";
          setError(errorMessage);
          showToast.error(errorMessage);
          return false;
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Lỗi chưa xác định, hãy thử lại sau!";
        setError(errorMessage);
        showToast.error(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [userId]
  );

  return {
    isLoading,
    error,
    changePassword,
  };
};
