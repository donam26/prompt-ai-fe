import { useCallback, useState } from "react";
import { sendMailService } from "@/services/admin";

interface SendMailRequest {
  reply: string;
}

interface SendMailResponse {
  success: boolean;
  failedEmails?: string[];
}

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (data: SendMailRequest) => Promise<SendMailResponse | null>;
}

export const useSendMail = (): IResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: SendMailRequest): Promise<SendMailResponse | null> => {
      setIsLoading(() => true);
      setError(() => "");

      try {
        const response = await sendMailService.sendMail(data);
        return response;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to send mail";
        setError(() => errorMessage);
        return null;
      } finally {
        setIsLoading(() => false);
      }
    },
    []
  );

  return {
    isLoading,
    error,
    mutate,
  };
};
