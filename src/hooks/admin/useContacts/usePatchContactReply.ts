import { useCallback, useState } from "react";
import { contactService } from "@/services/admin/contacts/contactService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isPatching: boolean;
  error: string;
  mutate: (id: string | number, reply: string) => Promise<boolean>;
}

export function usePatchContactReply(): IResponse {
  const [isPatching, setIsPatching] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (id: string | number, reply: string): Promise<boolean> => {
      setIsPatching(() => true);
      setError(() => "");

      try {
        await contactService.replyContact(id, reply);
        showToast.success("Phản hồi đã được gửi thành công");
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Có lỗi xảy ra";
        setError(() => errorMessage);
        showToast.error(errorMessage || "Không thể gửi phản hồi");
        return false;
      } finally {
        setIsPatching(() => false);
      }
    },
    []
  );

  return {
    isPatching,
    error,
    mutate,
  };
}
