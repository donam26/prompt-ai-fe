import { useCallback, useState } from "react";
import { sendMailService } from "@/services/admin";

interface SendMailTestRequest {
  reply: string;
}

interface SendMailTestResponse {
  success: boolean;
  failedEmails?: string[];
}

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (data: SendMailTestRequest) => Promise<SendMailTestResponse | null>;
}

export const useSendMailTest = (): IResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: SendMailTestRequest): Promise<SendMailTestResponse | null> => {
      setIsLoading(() => true);
      setError(() => "");

      try {
        const response = await sendMailService.sendMailTest(data);
        return response;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to send mail test";
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
