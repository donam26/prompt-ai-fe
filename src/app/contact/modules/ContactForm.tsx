"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { showToast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  contactFormSchema,
  getContactFormDefaultValues,
  type ContactFormSchema,
} from "@/libs/form-schemas/contact-schema";
import { contactService } from "@/services/admin/contacts/contactService";
import { CONTACTS_CONSTANTS } from "@/constants/contacts";

export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: getContactFormDefaultValues(),
  });

  const messageLength = watch("message")?.length || 0;

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
      showToast.success(
        "Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất có thể."
      );
      reset();
    },
    onError: (error: any) => {
      console.error("Contact submission error:", error);
      showToast.error("Có lỗi xảy ra khi gửi liên hệ. Vui lòng thử lại sau.");
    },
  });

  const onSubmit = async (data: ContactFormSchema) => {
    createContactMutation.mutate(data);
  };

  return (
    <div className="bg-white shadow-xl p-8 md:p-12 border border-gray-100 rounded-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Top row - Name, Email, Phone */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
          {/* Name Field */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="block mb-3 font-semibold text-gray-700 text-sm"
            >
              Họ và tên
            </Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                {...register("name")}
                placeholder="Nhập họ và tên của bạn"
                className={`h-12 px-4 text-base border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-purple-500 focus:ring-0 transition-colors duration-200 ${
                  errors.name ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="block mb-3 font-semibold text-gray-700 text-sm"
            >
              Địa chỉ email
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Nhập địa chỉ email của bạn"
                className={`h-12 px-4 text-base border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-purple-500 focus:ring-0 transition-colors duration-200 ${
                  errors.email ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label
              htmlFor="phoneNumber"
              className="block mb-3 font-semibold text-gray-700 text-sm"
            >
              Số điện thoại (tùy chọn)
            </Label>
            <div className="relative">
              <Input
                id="phoneNumber"
                type="tel"
                {...register("phoneNumber")}
                placeholder="Nhập số điện thoại của bạn"
                className={`h-12 px-4 text-base border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-purple-500 focus:ring-0 transition-colors duration-200 ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
            </div>
            {errors.phoneNumber && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label
            htmlFor="message"
            className="block mb-3 font-semibold text-gray-700 text-sm"
          >
            Tin nhắn
          </Label>
          <Textarea
            id="message"
            {...register("message")}
            placeholder="Nhập tin nhắn của bạn tại đây..."
            className={`min-h-[120px] px-4 py-3 text-base border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-purple-500 focus:ring-0 transition-colors duration-200 resize-none ${
              errors.message ? "border-red-500" : ""
            }`}
            disabled={isSubmitting}
          />
          <div className="flex justify-between mt-2 text-gray-500 text-sm">
            <span>{messageLength}/1000 ký tự</span>
            {errors.message && (
              <span className="text-red-500">{errors.message.message}</span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            className="flex justify-center items-center gap-3 bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-xl px-8 py-4 rounded-full w-full md:w-auto font-semibold text-white text-lg hover:scale-105 transition-all duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Đang gửi...
              </>
            ) : (
              <>
                Gửi tin nhắn
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
