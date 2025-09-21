import { useMutation } from "@tanstack/react-query";
import { userService } from "@/services";
import { showToast } from "@/components/ui/toast";
import { transformUserData } from "@/utils/userDataTransform";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES_URL } from "@/constants";
import type { UserVerifyResponse, UserAuthParams, ApiUser } from "@/types";
import { useRouter } from "next/navigation";

interface UseVerifyOTPQueryResult {
  isLoading: boolean;
  error: string | null;
  mutate: (email: string, otp: string) => void;
}

export const useVerifyOTPQuery = (): UseVerifyOTPQueryResult => {
  const { login } = useAuth();
  const router = useRouter();

  const verifyOTPMutation = useMutation({
    mutationFn: async ({ email, otp, userIP }: UserAuthParams) => {
      const response = await userService.verifyLogin({
        email,
        otp,
        userIP,
      });
      return response as unknown as {
        message: string;
        data: {
          user: ApiUser;
          token: string;
        };
      };
    },
    onSuccess: async (data: UserVerifyResponse) => {
      if (data && data.data && data.data.user && data.data.token) {
        const { user, token } = data.data;

        // Transform user data to match expected structure
        const userData = transformUserData(user);

        // Login and wait for completion
        login(userData, token);

        showToast.success(data.message || "Xác thực thành công!", {
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn quay trở lại!",
        });

        // Redirect to main page
        router.push(ROUTES_URL.HOME);
      }
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Mã OTP không đúng hoặc đã hết hạn";

      showToast.error("Xác thực thất bại", {
        title: "Lỗi xác thực",
        description: errorMessage,
      });
    },
  });

  const mutate = (email: string, otp: string): void => {
    fetch("https://api.ipify.org?format=json")
      .then(res => res.json())
      .then(data => data.ip)
      .catch(() => "127.0.0.1")
      .then(userIP => {
        verifyOTPMutation.mutate({
          email,
          otp,
          userIP,
        });
      });
  };

  return {
    isLoading: verifyOTPMutation.isPending,
    error: (verifyOTPMutation.error as { message?: string })?.message || null,
    mutate,
  };
};
