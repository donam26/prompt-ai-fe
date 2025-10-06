"use client";

import { Button } from "@/components/ui/button";
import { CHROME_EXTENSION_URL } from "@/constants";

export const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-no-repeat bg-center px-4 pt-24 md:pt-36 pb-8 lg:pb-10"
      style={{
        backgroundImage: "url('/images/home/background.png')",
      }}
    >
      <div className="z-10 relative mx-0 sm:mx-auto container">
        <div className="gap-1 mx-auto max-w-5xl font-sfu-franklin font-black text-[#5700C6] text-center">
          <h1 className="mb-4 font-black text-2xl md:text-6xl lg:text-7xl !leading-[1.2]">
            BIẾN AI THÀNH CÔNG CỤ!
            <br />
            KIẾM TIỀN THỰC THỤ
          </h1>

          <h2 className="mb-4 sm:mb-6 font-black text-[#5700C6] text-base sm:text-2xl">
            PROM AI HUB - HUB AI HÀNG ĐẦU CHO THẾ HỆ TRẺ VIỆT NAM
          </h2>

          <div className="hidden sm:block mx-auto mb-4 max-w-5xl font-bold text-gray-700 text-base md:text-lg">
            <p>
              Cùng những Founder, Marketer và AI Expert đang trực tiếp ứng dụng
              AI vào công việc và startup của họ.
            </p>
            <p>
              Đây là sân chơi nơi bạn học skillset thực chiến, kết nối cộng
              đồng, và luôn đi trước xu hướng.
            </p>
          </div>

          <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
            <div className="relative">
              <div
                className="-bottom-12 left-1/2 absolute opacity-70 blur-3xl rounded-full w-72 h-40 -translate-x-1/2"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255, 24, 137, 0.6) 0%, rgba(229, 102, 163, 0.3) 40%, rgba(181, 102, 229, 0) 70%)",
                }}
              />

              <Button
                className="flex justify-center items-center shadow-[inset_0px_0px_12px_rgba(255,255,255,0.6)] border rounded-full w-[330px] h-[53.5px] font-semibold text-white text-lg hover:scale-105 transition-all duration-300 hero-button-gradient"
                style={{ padding: "16px" }}
                onClick={() => window.open(CHROME_EXTENSION_URL, "_blank")}
              >
                <span className="mr-2">Bắt đầu hành trình</span>
                <svg
                  className="w-5 h-5 transition-transform hover:translate-x-1 duration-200"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
