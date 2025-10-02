import type { Contact } from "@/types/entities/contact";
import { useCallback, useState } from "react";
import { contactService } from "@/services/admin/contacts/contactService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isUpserting: boolean;
  error: string;
  mutate: (data: Partial<Contact>, id?: string | number) => Promise<boolean>;
}

export function useUpsertContact(): IResponse {
  const [isUpserting, setIsUpserting] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(
    async (data: Partial<Contact>, id?: string | number): Promise<boolean> => {
      setIsUpserting(() => true);
      setError(() => "");

      try {
        if (id) {
          await contactService.updateContact(id, data);
          showToast.success("Contact updated successfully");
        } else {
          await contactService.createContact(data);
          showToast.success("Contact created successfully");
        }
        return true;
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An error occurred";
        setError(() => errorMessage);
        showToast.error(errorMessage || "Failed to save contact");
        return false;
      } finally {
        setIsUpserting(() => false);
      }
    },
    []
  );

  return {
    isUpserting,
    error,
    mutate,
  };
}
