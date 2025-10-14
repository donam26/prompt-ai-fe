import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/services";
import { showToast } from "@/components/ui/toast";
import { transformUserData } from "@/utils/user-data-transform";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES_URL, getVerifyOTPUrl } from "@/constants";

interface UseLoginQueryResult {
  isLoading: boolean;
  error: string | null;
  mutate: (email: string) => Promise<boolean>;
}

export const useLoginQuery = (): UseLoginQueryResult => {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (email: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await userService.loginUser(email);
        const data = response.data;

        if (data && data.requireVerification) {
          showToast.info(
            data.message || "Mã OTP đã được gửi đến email của bạn",
            {
              title: "Xác thực tài khoản",
              description: "Vui lòng kiểm tra email và nhập mã OTP để tiếp tục",
            }
          );

          // Use Next.js router instead of window.location.href
          setTimeout(() => {
            router.push(getVerifyOTPUrl(email));
          }, 1500);
          return true;
        }

        if (data && data.success && data.data) {
          const { user, token } = data.data;
          const userData = transformUserData(user);

          await login(userData, token);

          showToast.success(data.message || "Đăng nhập thành công!", {
            title: "Đăng nhập thành công",
            description: "Chào mừng bạn quay trở lại!",
          });

          // Use Next.js router for smooth navigation
          router.push(ROUTES_URL.HOME);
          return true;
        }

        return false;
      } catch (err: unknown) {
        const errorMessage =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Có lỗi xảy ra khi đăng nhập";

        setError(errorMessage);
        showToast.error("Đăng nhập thất bại", {
          title: "Lỗi đăng nhập",
          description: errorMessage,
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [login, router]
  );

  return {
    isLoading,
    error,
    mutate,
  };
};
