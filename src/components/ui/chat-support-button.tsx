"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { Input } from "./input";
import { Button } from "./button";
import { showToast } from "./toast";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES_URL } from "@/constants/routes-url";
import { useFeedbackMutation } from "@/hooks/useFeedbackMutation";

export const ChatSupportButton = () => {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const {
    submitFeedback,
    isSubmitting,
    errorMessage: submitErrorMessage,
    resetFeedbackState,
  } = useFeedbackMutation();

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if user is near bottom (within 100px of bottom)
      setIsAtBottom(documentHeight - scrollTop - windowHeight < 100);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleOpenDialog = () => {
    resetFeedbackState();

    if (!isLoggedIn) {
      showToast.error("Vui lòng đăng nhập để sử dụng chức năng này");
      router.push(ROUTES_URL.LOGIN);
      return;
    }
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    resetFeedbackState();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      showToast.error("Vui lòng nhập tên của bạn");
      return;
    }

    if (!phone.trim()) {
      showToast.error("Vui lòng nhập số điện thoại");
      return;
    }

    try {
      await submitFeedback({
        name: name.trim(),
        phone: phone.trim(),
        email: user?.email || "",
        message: message.trim() || undefined,
      });

      showToast.success(
        "Gửi phản hồi thành công! Chúng tôi sẽ liên hệ lại sớm nhất có thể."
      );

      handleCloseDialog();
      setName("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Feedback submission error:", error);
      showToast.error(
        submitErrorMessage ||
          "Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại sau."
      );
    }
  };

  return (
    <>
      <button
        onClick={handleOpenDialog}
        className={`fixed right-6 z-50 flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 backdrop-blur-sm border-2 border-white/20 rounded-full text-white hover:scale-105 transition-all duration-300 transform disabled:pointer-events-none disabled:opacity-50 min-w-[56px] min-h-[56px] w-14 h-14 shadow-[0_8px_32px_rgba(139,92,246,0.4),0_0_0_1px_rgba(255,255,255,0.1)] ${
          isAtBottom ? "bottom-24" : "bottom-6"
        }`}
        aria-label="Liên hệ hỗ trợ"
      >
        <Mail className="drop-shadow-sm w-6 h-6 pointer-events-none" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="top-auto right-6 bottom-6 left-auto fixed w-[calc(100%-3rem)] sm:w-auto sm:max-w-md transform-none">
          <DialogHeader>
            <DialogTitle>Liên hệ hỗ trợ</DialogTitle>
            <DialogDescription>
              Vui lòng điền thông tin của bạn để chúng tôi có thể liên hệ lại
              sớm nhất.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium text-sm">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Nhập họ và tên của bạn"
                value={name}
                onChange={e => setName(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block font-medium text-sm">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="Nhập số điện thoại của bạn"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block font-medium text-sm">
                Tin nhắn (tùy chọn)
              </label>
              <textarea
                id="message"
                placeholder="Nhập tin nhắn của bạn..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={isSubmitting}
                rows={4}
                className="flex bg-transparent disabled:opacity-50 shadow-xs px-3 py-2 border border-input rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring w-full min-h-[80px] placeholder:text-muted-foreground text-sm disabled:cursor-not-allowed"
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                disabled={isSubmitting}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSubmitting ? "Đang xử lý..." : "Gửi"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
