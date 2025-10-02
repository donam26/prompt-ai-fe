import type { Contact } from "@/types/entities/contact";
import { useCallback, useState } from "react";
import { contactService } from "@/services/admin/contacts/contactService";
import { showToast } from "@/components/ui/toast";

interface IResponse {
  isLoading: boolean;
  error: string;
  mutate: (contact: Contact) => Promise<boolean>;
}

export function useDeleteContact(): IResponse {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const mutate = useCallback(async (contact: Contact): Promise<boolean> => {
    setIsLoading(() => true);
    setError(() => "");

    try {
      await contactService.deleteContact(contact.id);
      showToast.success("Contact deleted successfully");
      return true;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(() => errorMessage);
      showToast.error(errorMessage || "Failed to delete contact");
      return false;
    } finally {
      setIsLoading(() => false);
    }
  }, []);

  return {
    isLoading,
    error,
    mutate,
  };
}
