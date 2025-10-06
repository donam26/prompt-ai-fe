import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { contactService } from "@/services/admin/contacts/contactService";
import {
  getContactFormDefaultValues,
  type ContactFormSchema,
} from "@/libs/form-schemas/contact-schema";
import { CONTACTS_CONSTANTS } from "@/constants/contacts";

export const useContact = () => {
  const [formData, setFormData] = useState<ContactFormSchema>(
    getContactFormDefaultValues()
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormSchema, string>>
  >({});

  const handleFieldChange = (
    field: keyof ContactFormSchema,
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const clearForm = () => {
    setFormData(getContactFormDefaultValues());
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ContactFormSchema, string>> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Họ tên là bắt buộc";
    } else if (
      formData.name.length < CONTACTS_CONSTANTS.VALIDATION.NAME_MIN_LENGTH
    ) {
      newErrors.name = "Họ tên phải có ít nhất 2 ký tự";
    } else if (
      formData.name.length > CONTACTS_CONSTANTS.VALIDATION.NAME_MAX_LENGTH
    ) {
      newErrors.name = "Họ tên không được quá 100 ký tự";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    } else if (
      formData.email.length > CONTACTS_CONSTANTS.VALIDATION.EMAIL_MAX_LENGTH
    ) {
      newErrors.email = "Email không được quá 255 ký tự";
    }

    // Phone validation (optional)
    if (
      formData.phoneNumber &&
      formData.phoneNumber.length >
        CONTACTS_CONSTANTS.VALIDATION.PHONE_MAX_LENGTH
    ) {
      newErrors.phoneNumber = "Số điện thoại không được quá 20 ký tự";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Nội dung tin nhắn là bắt buộc";
    } else if (
      formData.message.length < CONTACTS_CONSTANTS.VALIDATION.MESSAGE_MIN_LENGTH
    ) {
      newErrors.message = "Nội dung tin nhắn phải có ít nhất 10 ký tự";
    } else if (
      formData.message.length > CONTACTS_CONSTANTS.VALIDATION.MESSAGE_MAX_LENGTH
    ) {
      newErrors.message = "Nội dung tin nhắn không được quá 1000 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createContactMutation = useMutation({
    mutationFn: async (data: ContactFormSchema) => {
      return contactService.createContact({
        name: data.name.trim(),
        email: data.email.trim(),
        phoneNumber: data.phoneNumber?.trim() || null,
        message: data.message.trim(),
        type: data.type || CONTACTS_CONSTANTS.TYPE.SUPPORT,
        status: CONTACTS_CONSTANTS.STATUS.UNREPLIED,
      });
    },
    onSuccess: () => {
      toast.success(
        "Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất có thể."
      );
      clearForm();
    },
    onError: (error: any) => {
      console.error("Contact submission error:", error);
      toast.error("Có lỗi xảy ra khi gửi liên hệ. Vui lòng thử lại sau.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin đã nhập");
      return;
    }

    createContactMutation.mutate(formData);
  };

  return {
    formData,
    errors,
    isLoading: createContactMutation.isPending,
    handleFieldChange,
    handleSubmit,
    clearForm,
  };
};
