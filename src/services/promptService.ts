import { ENDPOINTS } from "@/constants/api";
import { MenuItem } from "@/app/prompt-library/[id]/modules/Sidebar";
import { Prompt } from "@/types";

interface PromptRequest {
  userPrompt: string;
  images: any[];
  nangCap: boolean;
  model: string;
  language: string;
  type: string;
  id?: number;
  title?: string;
}

interface StreamResponse {
  type: "content" | "completed" | "error" | "connected";
  content?: string;
  error?: string;
  model?: string;
  cost?: number;
}

export class PromptService {
  private static readonly API_URL = process.env.NEXT_PUBLIC_API_URL;

  static async streamPrompt(
    request: PromptRequest,
    token: string,
    onMessage: (response: StreamResponse) => void,
    onError: (error: Error) => void,
    onComplete: () => void
  ): Promise<void> {
    try {
      const fullUrl = `${this.API_URL}${ENDPOINTS.CHAT.GPT_STREAM}`;

      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Handle specific error formats from backend
        if (errorData.success === false && errorData.error) {
          const errorCode = errorData.error.code;
          const errorMessage = errorData.error.message;

          // Create error with specific format for credit errors
          if (errorCode === "INSUFFICIENT_CREDIT") {
            throw new Error(`CREDIT_ERROR: ${errorMessage}`);
          }

          throw new Error(`${response.status}: ${errorMessage}`);
        }

        const errorMessage =
          errorData.error || errorData.message || "Có lỗi xảy ra khi gọi API";

        throw new Error(`${response.status}: ${errorMessage}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            onComplete();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (let line of lines) {
            line = line.trim();
            if (!line.trim()) continue;

            if (line === "data: [DONE]") {
              onComplete();
              continue;
            }

            if (!line.startsWith("data: ")) continue;

            try {
              const json = JSON.parse(line.slice(6));
              onMessage(json as StreamResponse);
            } catch (e) {
              console.error("Error parsing JSON:", e);
            }
          }
        }
      } catch (streamError) {
        console.error("Stream error:", streamError);
        onError(streamError as Error);
      } finally {
        if (reader) {
          try {
            await reader.cancel();
          } catch (e) {
            console.warn("Error canceling reader:", e);
          }
        }
      }
    } catch (error) {
      onError(error as Error);
    }
  }

  static createPromptRequest(
    userPrompt: string,
    model: string,
    language: string,
    promptType: string,
    selectedMenuItem: MenuItem,
    prompt?: Prompt | null
  ): PromptRequest {
    return {
      userPrompt,
      images: [],
      nangCap: selectedMenuItem === MenuItem.PROMPT_OPTIMIZER,
      model,
      language,
      type: promptType,
      id: prompt?.id,
      title: prompt?.title,
    };
  }

  static isAuthError(errorMessage: string): boolean {
    const lowerError = errorMessage.toLowerCase();
    return (
      lowerError.includes("token") ||
      lowerError.includes("unauthorized") ||
      lowerError.includes("authentication") ||
      lowerError.includes("đăng nhập")
    );
  }

  static isCreditError(errorMessage: string): boolean {
    return (
      errorMessage.includes("CREDIT_ERROR:") ||
      errorMessage.includes("credit") ||
      errorMessage.includes("Không đủ credit") ||
      errorMessage.includes("INSUFFICIENT_CREDIT")
    );
  }
}
