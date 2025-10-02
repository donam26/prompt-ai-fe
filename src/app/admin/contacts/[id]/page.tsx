"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useContactDetail } from "@/hooks/admin/useContacts";
import { FormSkeleton } from "@/components/ui/skeleton";
import { showToast } from "@/components/ui/toast";
import { CONTACTS_CONSTANTS } from "@/constants/contacts";
import { ContactViewForm } from "./modules/contact-view-form";

export default function ContactViewPage() {
  const { id } = useParams<{ id?: string }>();
  const router = useRouter();

  const contactId = id;

  const {
    contact: contactData,
    isLoading,
    error: contactDetailError,
    refetch: refetchContact,
  } = useContactDetail(contactId);

  const handleCancel = useCallback(() => {
    router.push(CONTACTS_CONSTANTS.ROUTES.CONTACTS);
  }, [router]);

  const handleReplySuccess = useCallback(() => {
    refetchContact();
  }, [refetchContact]);

  useEffect(() => {
    if (!contactDetailError) {
      return;
    }
    showToast.error(contactDetailError);
    router.push(CONTACTS_CONSTANTS.ROUTES.CONTACTS);
  }, [contactDetailError, router]);

  if (isLoading) {
    return <FormSkeleton />;
  }

  if (!contactData) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Không tìm thấy liên hệ.
      </div>
    );
  }

  return (
    <ContactViewForm
      contact={contactData}
      onCancel={handleCancel}
      onReplySuccess={handleReplySuccess}
      isLoading={isLoading}
    />
  );
}
