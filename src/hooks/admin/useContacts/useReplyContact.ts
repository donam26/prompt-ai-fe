import { useCallback, useState } from "react";
import { contactService } from "@/services/admin/contacts/contactService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isReplying: boolean;
  error: string;
  mutate: (id: string | number, reply: string) => Promise<boolean>;
}

export function useReplyContact(): IResponse {
  const [isReplying, setIsReplying] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (id: string | number, reply: string): Promise<boolean> => {
      setIsReplying(() => true);
      setError(() => "");

      try {
        await contactService.replyContact(id, reply);
        showToast.success("Reply sent successfully");
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(() => errorMessage);
        showToast.error(errorMessage || "Failed to send reply");
        return false;
      } finally {
        setIsReplying(() => false);
      }
    },
    []
  );

  return {
    isReplying,
    error,
    mutate,
  };
}
