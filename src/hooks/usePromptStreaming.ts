import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/components/ui/toast";
import { ROUTES_URL } from "@/constants/routes-url";
import { MenuItem } from "@/app/prompt-library/[id]/modules/Sidebar";
import { Prompt } from "@/types";
import { PromptService } from "@/services/promptService";
import { trackRunPrompt } from "@/lib/ga";

interface UsePromptStreamingProps {
  prompt: Prompt | null;
  selectedMenuItem: MenuItem;
  model: string;
  language: string;
  promptType: string;
  contentEditableRef: React.RefObject<HTMLElement | null>;
}

export const usePromptStreaming = ({
  prompt,
  selectedMenuItem,
  model,
  language,
  promptType,
  contentEditableRef,
}: UsePromptStreamingProps) => {
  const router = useRouter();
  const { user, token, logout } = useAuth();

  const [gptLoading, setGptLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [isStreamDone, setIsStreamDone] = useState(false);

  const handleError = useCallback(
    (errorMessage: string, isStreamError = false) => {
      const isAuth = PromptService.isAuthError(errorMessage);
      const isCredit = PromptService.isCreditError(errorMessage);

      if (isAuth) {
        showToast.error("Phiên đăng nhập đã hết hạn", {
          description: "Vui lòng đăng nhập lại để tiếp tục.",
          duration: 5000,
        });
        setTimeout(() => {
          logout();
          router.push(ROUTES_URL.LOGIN);
        }, 2000);
      } else if (isCredit) {
        // Extract actual error message from CREDIT_ERROR: prefix
        const actualMessage = errorMessage.replace(/^CREDIT_ERROR:\s*/, "");

        showToast.error("Không đủ credit", {
          title: "Tài khoản của bạn đã hết credit",
          description:
            actualMessage || "Vui lòng nâng cấp gói để tiếp tục sử dụng.",
          duration: 5000,
        });
        setTimeout(() => {
          router.push(ROUTES_URL.PRICING);
        }, 3000);
      } else {
        showToast.error(
          isStreamError ? "Có lỗi xảy ra" : "Có lỗi xảy ra khi gọi API",
          {
            description: errorMessage || "Vui lòng thử lại sau.",
            duration: 4000,
          }
        );
      }
    },
    [logout, router]
  );

  const handleSubmit = useCallback(async () => {
    // Get current text directly from contentEditable ref
    const currentText = contentEditableRef.current?.innerText || "";

    // Use currentText from ref instead of state for validation
    if (!currentText?.trim()) {
      showToast.error("Vui lòng nhập prompt trước khi chạy!", {
        description: "Prompt không được để trống.",
      });
      return;
    }

    try {
      setGptLoading(true);
      setIsStreamDone(false);
      setResponse("");

      // Check if user is authenticated
      if (!token || !user) {
        showToast.error("Chưa đăng nhập", {
          description: "Vui lòng đăng nhập để sử dụng tính năng chạy prompt.",
          duration: 5000,
        });
        setGptLoading(false);

        // Redirect to login after 2s
        setTimeout(() => {
          router.push(ROUTES_URL.LOGIN);
        }, 2000);

        return;
      }

      // Check if user has credits
      const userCredits = user?.countPromt ?? 0;
      if (userCredits <= 0) {
        showToast.warning("Bạn đã hết credit", {
          title: "Tài khoản của bạn đã hết credit",
          description:
            "Vui lòng nâng cấp gói hoặc mua thêm credit để tiếp tục sử dụng.",
          duration: 5000,
        });
        setGptLoading(false);

        // Redirect to pricing after 3s
        setTimeout(() => {
          router.push(ROUTES_URL.PRICING);
        }, 3000);

        return;
      }

      const request = PromptService.createPromptRequest(
        currentText,
        model,
        language,
        promptType,
        selectedMenuItem,
        prompt
      );

      // Track prompt run event for analytics
      if (user?.email) {
        trackRunPrompt({
          who: user.email,
          prompt_type: promptType,
          prompt_id: prompt?.id,
          prompt_name: prompt?.title,
        });
      }

      await PromptService.streamPrompt(
        request,
        token,
        response => {
          // Handle different message types from backend
          switch (response.type) {
            case "content":
              // BE gửi toàn bộ content (cumulative), chỉ cần replace
              setResponse(response.content + "\n\n[SKELETON]");
              break;

            case "completed":
              setIsStreamDone(true);
              setGptLoading(false);
              // Remove [SKELETON] marker when done
              setResponse(prev => prev.replace("\n\n[SKELETON]", ""));
              showToast.success(`Hoàn thành`);
              break;

            case "error":
              setGptLoading(false);
              handleError(response.error || "", true);
              break;
          }
        },
        error => {
          setGptLoading(false);
          const errorMessage = error.message.replace(/^\d+:\s*/, "");
          handleError(errorMessage, false);
        },
        () => {
          setIsStreamDone(true);
        }
      );
    } catch (err) {
      console.error("Error calling API:", err);
      setGptLoading(false);
      showToast.error("Có lỗi xảy ra khi gọi API", {
        description: "Vui lòng thử lại sau.",
        duration: 4000,
      });
    }
  }, [
    prompt,
    selectedMenuItem,
    model,
    language,
    promptType,
    user,
    token,
    router,
    contentEditableRef,
    handleError,
  ]);

  return {
    gptLoading,
    response,
    isStreamDone,
    setResponse,
    handleSubmit,
  };
};
