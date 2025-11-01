"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/video/payment.mp4" as const;
const VIDEO_POSTER = "/images/tutorials/huong_dan_hinh_1.png" as const;

/**
 * Renders a floating VNPay tutorial trigger that opens a centered video modal on demand.
 */
export const PaymentTutorialSection = (): React.ReactElement => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState<boolean>(false);
  useEffect(() => {
    if (!isModalOpen) {
      return;
    }
    setShouldLoadVideo(true);
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }
      setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isModalOpen]);

  const handleTogglePlayback = (
    event: React.KeyboardEvent<HTMLVideoElement>
  ): void => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }
    event.preventDefault();
    const element = videoRef.current;
    if (!element) {
      return;
    }
    if (element.paused) {
      void element.play();
      return;
    }
    element.pause();
  };
  const handleOpenModal = (): void => {
    setIsModalOpen(true);
  };
  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };
  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement>
  ): void => {
    if (event.target !== event.currentTarget) {
      return;
    }
    handleCloseModal();
  };
  const handleOpenVideo = (
    event: React.MouseEvent<HTMLAnchorElement>
  ): void => {
    event.preventDefault();
    window.open(VIDEO_SRC, "_blank", "noreferrer");
  };
  return (
    <>
      <button
        type="button"
        className="right-6 bottom-24 z-40 fixed flex items-center gap-2 bg-[#5700C6] hover:opacity-90 shadow-lg px-4 py-3 rounded-full focus:outline-none focus-visible:ring-[#5700C6] focus-visible:ring-2 focus-visible:ring-offset-2 font-semibold text-white text-sm transition"
        onClick={handleOpenModal}
        aria-label="Mở hướng dẫn thanh toán VNPay"
      >
        Hướng dẫn thanh toán
      </button>
      {isModalOpen && (
        <div
          className="z-50 fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Hướng dẫn thanh toán VNPay"
          onClick={handleOverlayClick}
        >
          <div className="relative flex flex-col gap-4 bg-white shadow-2xl p-6 rounded-3xl w-full max-w-3xl">
            <button
              type="button"
              className="top-4 right-4 absolute bg-[#F1E6FF] hover:bg-[#E4CEFF] px-3 py-1 rounded-full focus:outline-none focus-visible:ring-[#5700C6] focus-visible:ring-2 focus-visible:ring-offset-2 font-semibold text-[#5700C6] text-sm transition"
              onClick={handleCloseModal}
              aria-label="Đóng hướng dẫn thanh toán VNPay"
            >
              Đóng
            </button>
            <div className="flex flex-col gap-3 mt-6">
              <h2 className="font-semibold text-[#1D1E25] text-2xl">
                Hướng dẫn thanh toán VNPay
              </h2>
              <p className="text-[#555] text-sm">
                Làm theo video để hoàn tất thanh toán VNPay chỉ trong vài bước
                đơn giản.
              </p>
            </div>
            <div className="rounded-2xl w-full max-h-[70vh] overflow-hidden">
              <div className="w-full aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls
                  preload="none"
                  poster={VIDEO_POSTER}
                  tabIndex={0}
                  aria-label="Video hướng dẫn thanh toán VNPay"
                  onKeyDown={handleTogglePlayback}
                >
                  {shouldLoadVideo && (
                    <source src={VIDEO_SRC} type="video/mp4" />
                  )}
                  Trình duyệt của bạn không hỗ trợ phát video.
                </video>
              </div>
            </div>
            <a
              className="inline-flex justify-center items-center bg-[#5700C6] hover:opacity-90 px-6 py-2 rounded-full focus:outline-none focus-visible:ring-[#5700C6] focus-visible:ring-2 focus-visible:ring-offset-2 w-fit font-semibold text-white text-sm transition"
              href={VIDEO_SRC}
              onClick={handleOpenVideo}
              tabIndex={0}
              aria-label="Mở video hướng dẫn thanh toán VNPay trong tab mới"
            >
              Tải video hướng dẫn
            </a>
          </div>
        </div>
      )}
    </>
  );
};
