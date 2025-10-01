import { useCallback, useState } from "react";
import { userService } from "@/services";
import { showToast } from "@/components/ui/toast";

interface UseResendOTPQueryResult {
  isLoading: boolean;
  error: string | null;
  mutate: (email: string) => Promise<boolean>;
}

export const useResendOTPQuery = (): UseResendOTPQueryResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await userService.resendOTP(email);
      showToast.success("Mã OTP mới đã được gửi", {
        title: "Gửi lại mã OTP thành công",
        description: "Vui lòng kiểm tra email của bạn",
      });
      return true;
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Không thể gửi lại mã OTP";

      setError(errorMessage);
      showToast.error("Gửi lại mã OTP thất bại", {
        title: "Lỗi",
        description: errorMessage,
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    mutate,
  };
};
