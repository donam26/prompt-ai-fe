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
import { feedbackService } from "@/services";

export const ChatSupportButton = () => {
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!isLoggedIn) {
      showToast.error("Vui lòng đăng nhập để sử dụng chức năng này");
      router.push(ROUTES_URL.LOGIN);
      return;
    }
    setIsOpen(true);
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

    setIsSubmitting(true);

    try {
      await feedbackService.submitFeedback({
        name: name.trim(),
        phone: phone.trim(),
        email: user?.email || "",
        message: message.trim() || undefined,
      });

      showToast.success(
        "Gửi phản hồi thành công! Chúng tôi sẽ liên hệ lại sớm nhất có thể."
      );

      // Close dialog and reset form
      setIsOpen(false);
      setName("");
      setPhone("");
      setMessage("");
    } catch (error: any) {
      console.error("Feedback submission error:", error);
      showToast.error("Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenDialog}
        className={`fixed right-6 z-50 flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 shadow-2xl backdrop-blur-sm p-4 border-2 border-white/20 rounded-full text-white hover:scale-105 transition-all duration-300 transform disabled:pointer-events-none disabled:opacity-50 ${
          isAtBottom ? "bottom-24" : "bottom-6"
        }`}
        aria-label="Liên hệ hỗ trợ"
        style={{
          minWidth: "56px",
          minHeight: "56px",
          width: "56px",
          height: "56px",
          boxShadow:
            "0 8px 32px rgba(139, 92, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
      >
        <Mail
          className="drop-shadow-sm w-6 h-6"
          style={{ pointerEvents: "none" }}
        />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="sm:max-w-md"
          style={{
            position: "fixed",
            top: "auto",
            bottom: "24px",
            right: "24px",
            left: "auto",
            transform: "none",
          }}
        >
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
                onClick={() => setIsOpen(false)}
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
