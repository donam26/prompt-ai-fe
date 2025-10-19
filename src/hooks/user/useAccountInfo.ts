"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import { userService } from "@/services";
import { showToast } from "@/components/ui/toast";
import { User } from "@/types";

interface UseAccountInfoOptions {
  userId: string | number;
  enabled?: boolean;
}

export const useAccountInfo = (options: UseAccountInfoOptions) => {
  const { userId, enabled = true } = options;
  const { setUser, user } = useAuth();

  // State
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  // Fetch user info
  const fetchUserInfo = useCallback(async () => {
    if (!enabled || !userId) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await userService.getUserInfo();
      if (response.data) {
        setUserInfo(response.data);
      }
    } catch (err: unknown) {
      console.error("Error fetching user info:", err);
    }
  }, [userId, enabled]);

  // Load all data
  const loadAllData = useCallback(async () => {
    if (!enabled) return;

    await fetchUserInfo();
  }, [enabled, fetchUserInfo]);

  // Update profile
  const updateProfile = useCallback(
    async (data: { fullName: string; profileImage?: File }) => {
      if (!userId) return false;

      setIsLoading(true);
      setError("");

      try {
        const formData = new FormData();
        formData.append("fullName", data.fullName.trim());

        if (data.profileImage) {
          formData.append("profileImage", data.profileImage);
        }

        const response = await userService.updateUserInfo(userId, formData);

        if (response && response.user && user) {
          const updatedUser = {
            ...user,
            fullName: response.user.fullName,
            avatar: response.user.avatar,
          };

          setUser(updatedUser);
          await fetchUserInfo();
          showToast.success("Cập nhật thông tin thành công");
          return true;
        } else {
          setError("Cập nhật thông tin không thành công");
          showToast.error("Cập nhật thông tin không thành công");
          return false;
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Đã xảy ra lỗi khi cập nhật thông tin";
        setError(errorMessage);
        showToast.error(errorMessage);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [userId, user, setUser, fetchUserInfo]
  );

  // Validate file
  const validateFile = useCallback((file: File) => {
    const maxSize = 800 * 1024; // 800KB
    if (file.size > maxSize) {
      showToast.error("Kích thước file không được vượt quá 800KB");
      return false;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      showToast.error("Chỉ chấp nhận file JPG, GIF, PNG");
      return false;
    }

    return true;
  }, []);

  // Load data on mount
  useEffect(() => {
    if (enabled) {
      loadAllData();
    }
  }, [enabled, loadAllData]);

  return {
    userInfo,
    isLoading,
    error,
    updateProfile,
    validateFile,
    refetch: loadAllData,
  };
};
