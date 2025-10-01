import { useCallback, useState } from "react";
import { userService } from "@/services";
import { showToast } from "@/components/ui/toast";
import { transformUserData } from "@/utils/user-data-transform";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES_URL } from "@/constants";
import { useRouter } from "next/navigation";

interface UseVerifyOTPQueryResult {
  isLoading: boolean;
  error: string | null;
  mutate: (email: string, otp: string) => Promise<boolean>;
}

export const useVerifyOTPQuery = (): UseVerifyOTPQueryResult => {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (email: string, otp: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        // const userIP = await fetch("https://api.ipify.org?format=json")
        //   .then(res => res.json())
        //   .then(data => data.ip)
        //   .catch(() => "127.0.0.1");

        const response = await userService.verifyOTP(email, otp);
        const data = response.data;

        if (data) {
          const { user, token } = data.data;
          const userData = transformUserData(user);

          login(userData, token);

          showToast.success(data.message || "Xác thực thành công!", {
            title: "Đăng nhập thành công",
            description: "Chào mừng bạn quay trở lại!",
          });

          router.push(ROUTES_URL.HOME);
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
    [login, router]
  );

  return {
    isLoading,
    error,
    mutate,
  };
};
