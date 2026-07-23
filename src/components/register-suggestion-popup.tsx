"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES_URL } from "@/constants/routes-url";
import { Sparkles, ArrowRight } from "lucide-react";

const STORAGE_KEY = "register-suggestion-shown";

export const RegisterSuggestionPopup = (): React.JSX.Element | null => {
  const { isLoggedIn, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const registerButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isLoading) return;

    if (isLoggedIn) {
      setIsOpen(false);
      return;
    }

    const hasShown = localStorage.getItem(STORAGE_KEY);
    if (!hasShown) {
      // Delay một chút để UX tốt hơn
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000); // Hiển thị sau 2 giây

      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isLoading]);

  const handleClose = (): void => {
    setIsOpen(false);
    // Lưu vào localStorage để không hiển thị lại
    localStorage.setItem(STORAGE_KEY, "true");
  };

  const handleRegisterClick = (): void => {
    // Đánh dấu đã hiển thị khi user click vào link
    localStorage.setItem(STORAGE_KEY, "true");
    setIsOpen(false);
  };

  // Auto focus vào button khi dialog mở
  useEffect(() => {
    if (isOpen && registerButtonRef.current) {
      // Delay một chút để đảm bảo dialog đã render xong
      const timer = setTimeout(() => {
        registerButtonRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        showCloseButton={true}
        className="bg-white shadow-2xl p-0 border-0 sm:max-w-md overflow-hidden"
      >
        {/* Hidden title for accessibility */}
        <DialogTitle className="sr-only">
          Chào mừng đến với Prom - Đăng ký tài khoản
        </DialogTitle>

        {/* Decorative gradient background */}
        <div className="top-0 right-0 left-0 absolute bg-gradient-to-br from-[#5700C6]/8 via-[#8B5CF6]/5 to-transparent h-40" />

        <div className="relative flex flex-col items-center px-6 sm:px-8 py-8 sm:py-10 text-center">
          {/* Icon with gradient background */}
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5700C6] to-[#8B5CF6] opacity-20 blur-2xl rounded-full animate-pulse" />
            <div className="relative flex justify-center items-center bg-gradient-to-br from-[#5700C6] to-[#8B5CF6] shadow-lg rounded-full w-16 sm:w-20 h-16 sm:h-20">
              <Sparkles className="w-8 sm:w-10 h-8 sm:h-10 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3 mb-2">
            <h3 className="font-bold text-gray-900 text-xl sm:text-2xl leading-tight">
              Chào mừng đến với{" "}
              <span className="bg-clip-text bg-gradient-to-r from-[#5700C6] to-[#8B5CF6] text-transparent">
                Prom!
              </span>
            </h3>
            <DialogDescription className="mx-auto max-w-sm text-gray-600 text-sm sm:text-base leading-relaxed">
              Đăng ký ngay để khám phá hơn{" "}
              <span className="font-semibold text-[#5700C6]">
                98,000+ prompts
              </span>{" "}
              từ các chuyên gia AI
            </DialogDescription>
          </div>

          {/* CTA Button */}
          <div className="mt-4 mb-3 w-full">
            <Link
              ref={registerButtonRef}
              href={ROUTES_URL.REGISTER}
              onClick={handleRegisterClick}
              className="group relative flex justify-center items-center gap-2 bg-[#5700C6] hover:bg-[#4a00a8] shadow-md hover:shadow-lg px-6 py-3 rounded-full focus:outline-none focus:ring-[#5700C6] focus:ring-2 focus:ring-offset-2 w-full font-bold text-white text-sm sm:text-base hover:scale-[1.02] transition-all duration-200"
            >
              <span>Đăng ký ngay</span>
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Skip button */}
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-xs sm:text-sm transition-colors duration-200"
          >
            Để sau
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
