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
        // Map profileImage to avatar for consistency
        const userData = {
          ...response.data,
          avatar: response.data.profileImage || response.data.avatar,
        };
        setUserInfo(userData);
      }
    } catch (err: unknown) {
      console.error("Error fetching user info:", err);
    } finally {
      setIsLoading(false);
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
        
        // Append fullName (BE accepts both fullName and full_name)
        if (data.fullName && data.fullName.trim()) {
          formData.append("fullName", data.fullName.trim());
        }

        // Append profile_image (BE expects profile_image, not profileImage)
        if (data.profileImage) {
          formData.append("profile_image", data.profileImage);
        }

        const response = await userService.updateUserInfo(userId, formData);

        if (response && response.success && response.data && user) {
          // Map profileImage to avatar for consistency
          const updatedUser = {
            ...user,
            fullName: response.data.fullName,
            avatar: response.data.profileImage || response.data.avatar,
          };

          setUser(updatedUser);
          
          // Call get me API to refresh user info
          await fetchUserInfo();
          
          // Show success message from API or default message
          const successMessage = response.message || "Cập nhật thông tin thành công";
          showToast.success(successMessage);
          return true;
        } else {
          const errorMessage = response?.message || "Cập nhật thông tin không thành công";
          setError(errorMessage);
          showToast.error(errorMessage);
          return false;
        }
      } catch (err: unknown) {
        let errorMessage = "Đã xảy ra lỗi khi cập nhật thông tin";
        
        // Try to extract error message from response
        if (err && typeof err === "object" && "response" in err) {
          const axiosError = err as { response?: { data?: { message?: string } } };
          if (axiosError.response?.data?.message) {
            errorMessage = axiosError.response.data.message;
          }
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        
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
