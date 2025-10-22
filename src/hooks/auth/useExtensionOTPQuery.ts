import { useCallback, useState } from "react";
import { userService } from "@/services";
import { showToast } from "@/components/ui/toast";
import { transformUserData } from "@/utils/user-data-transform";
import { useAuth } from "@/hooks/useAuth";

interface UseExtensionOTPQueryResult {
  isLoading: boolean;
  error: string | null;
  mutate: (email: string, otp: string) => Promise<boolean>;
}

export const useExtensionOTPQuery = (): UseExtensionOTPQueryResult => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (email: string, otp: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await userService.verifyOTP(email, otp);
        const data = response.data;

        if (data) {
          const { user, token } = data.data;
          const userData = transformUserData(user);

          // Login without redirect for extension popup
          await login(userData, token);

          showToast.success(data.message || "Xác thực thành công!", {
            title: "Đăng nhập thành công",
            description: "Chào mừng bạn quay trở lại!",
          });

          return true;
        }

        return false;
      } catch (err: unknown) {
        const errorMessage =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Mã OTP không đúng hoặc đã hết hạn";

        setError(errorMessage);
        showToast.error("Xác thực thất bại", {
          title: "Lỗi xác thực",
          description: errorMessage,
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [login]
  );

  return {
    isLoading,
    error,
    mutate,
  };
};
