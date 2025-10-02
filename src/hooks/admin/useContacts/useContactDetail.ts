import { useState, useEffect } from "react";
import { contactService } from "@/services/admin/contacts/contactService";
import type { Contact } from "@/types/entities/contact";

interface IResponse {
  contact: Contact | null;
  isLoading: boolean;
  error: string;
  refetch: () => void;
}

export function useContactDetail(id?: string): IResponse {
  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const fetchContact = async () => {
    if (!id) {
      setContact(null);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await contactService.getContact(id);
      if (response.success && response.data) {
        setContact(response.data);
      } else {
        setError("Contact not found");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, [id]);

  return {
    contact,
    isLoading,
    error,
    refetch: fetchContact,
  };
}
