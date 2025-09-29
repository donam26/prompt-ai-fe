import { useMutation } from "@tanstack/react-query";
import { userService } from "@/services";
import { showToast } from "@/components/ui/toast";
import { transformUserData } from "@/utils/user-data-transform";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES_URL, getVerifyOTPUrl } from "@/constants";
import type { UserLoginResponse } from "@/types/services/userService";

interface UseLoginQueryResult {
  isLoading: boolean;
  error: string | null;
  mutate: (email: string) => void;
}

export const useLoginQuery = (): UseLoginQueryResult => {
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await userService.loginUser(email);
      return response.data as unknown as UserLoginResponse;
    },
    onSuccess: async (data, email) => {
      if (data && data.requireVerification) {
        // Show notification first
        showToast.info(data.message || "Mã OTP đã được gửi đến email của bạn", {
          title: "Xác thực tài khoản",
          description: "Vui lòng kiểm tra email và nhập mã OTP để tiếp tục",
        });

        // Wait a bit for user to see the toast, then redirect
        setTimeout(() => {
          window.location.href = getVerifyOTPUrl(email);
        }, 2000);
        return;
      }

      if (data && data.success && data.data) {
        const { user, token } = data.data;
        const userData = transformUserData(user);

        // Login and wait for completion
        await login(userData, token);

        showToast.success(data.message || "Đăng nhập thành công!", {
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn quay trở lại!",
        });

        // Redirect to main page
        window.location.href = ROUTES_URL.HOME;
      }
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Có lỗi xảy ra khi đăng nhập";

      showToast.error("Đăng nhập thất bại", {
        title: "Lỗi đăng nhập",
        description: errorMessage,
      });
    },
  });

  const mutate = (email: string): void => {
    loginMutation.mutate(email);
  };

  return {
    isLoading: loginMutation.isPending,
    error: (loginMutation.error as { message?: string })?.message || null,
    mutate,
  };
};
