"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement actual form submission logic
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Reset form and close modal
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
      onClose();
    } catch {
      // Handle error silently or show user-friendly message
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white shadow-2xl mx-4 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-gray-200 border-b">
          <h2 className="font-bold text-[#1D1E25] text-2xl">Liên hệ tư vấn</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-2 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="mb-6 text-gray-600">
            Để lại thông tin để chúng tôi có thể tư vấn gói dịch vụ phù hợp nhất
            cho bạn.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="name"
                  className="font-medium text-[#1D1E25] text-sm"
                >
                  Họ và tên *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="Nhập họ và tên"
                />
              </div>
              <div>
                <Label
                  htmlFor="email"
                  className="font-medium text-[#1D1E25] text-sm"
                >
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="Nhập email"
                />
              </div>
            </div>

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
              <div>
                <Label
                  htmlFor="phone"
                  className="font-medium text-[#1D1E25] text-sm"
                >
                  Số điện thoại *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                  placeholder="Nhập số điện thoại"
                />
              </div>
              <div>
                <Label
                  htmlFor="company"
                  className="font-medium text-[#1D1E25] text-sm"
                >
                  Công ty/Tổ chức
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="mt-1"
                  placeholder="Nhập tên công ty"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="message"
                className="font-medium text-[#1D1E25] text-sm"
              >
                Tin nhắn *
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="mt-1 min-h-[120px]"
                placeholder="Mô tả nhu cầu của bạn..."
              />
            </div>

            <div className="flex sm:flex-row flex-col gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-[#5700C6] hover:from-[#4A00A3] to-[#8B5CF6] hover:to-[#7C3AED] px-6 py-3 rounded-full font-semibold text-white transition-all duration-300"
              >
                {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 sm:flex-none hover:bg-[#F4F0FF] border-[#E2D0FF] text-[#1D1E25]"
              >
                Hủy
              </Button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-gray-200 border-t">
            <h3 className="mb-4 font-semibold text-[#1D1E25] text-lg">
              Hoặc liên hệ trực tiếp
            </h3>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-3 text-center">
              <div>
                <p className="font-medium text-[#1D1E25] text-sm">Zalo</p>
                <p className="text-[#1D1E25] text-sm">0909.107.018</p>
              </div>
              <div>
                <p className="font-medium text-[#1D1E25] text-sm">Email</p>
                <p className="text-[#1D1E25] text-sm">contact@prom.io</p>
              </div>
              <div>
                <p className="font-medium text-[#1D1E25] text-sm">Discord</p>
                <p className="text-[#1D1E25] text-sm">@support_prom.io</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
