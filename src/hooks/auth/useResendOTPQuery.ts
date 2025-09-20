import { useMutation } from "@tanstack/react-query";
import { userService } from "@/services";
import { showToast } from "@/components/ui/toast";
import type { UserResendOTPResponse } from "@/types";

interface UseResendOTPQueryResult {
  isLoading: boolean;
  error: string | null;
  mutate: (email: string) => void;
}

export const useResendOTPQuery = (): UseResendOTPQueryResult => {
  const resendOTPMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await userService.resendOTP(email);
      return response.data as UserResendOTPResponse;
    },
    onSuccess: (data: UserResendOTPResponse) => {
      const message = data.message || "Mã OTP mới đã được gửi";
      showToast.success(message, {
        title: "Gửi lại mã OTP thành công",
        description: "Vui lòng kiểm tra email của bạn",
      });
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message || "Không thể gửi lại mã OTP";

      showToast.error("Gửi lại mã OTP thất bại", {
        title: "Lỗi",
        description: errorMessage,
      });
    },
  });

  const mutate = (email: string): void => {
    resendOTPMutation.mutate(email);
  };

  return {
    isLoading: resendOTPMutation.isPending,
    error: (resendOTPMutation.error as { message?: string })?.message || null,
    mutate,
  };
};
