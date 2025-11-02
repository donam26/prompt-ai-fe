"use client";

import { Button } from "@/components/ui/button";
import { SKOOL_COMMUNITY_URL } from "@/constants";
import { ArrowRightIcon } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-no-repeat bg-center px-4 pt-24 md:pt-36 pb-8 lg:pb-10 min-h-[400px] sm:min-h-[500px] md:min-h-[600px]"
      style={{
        backgroundImage: "url('/images/home/background.png')",
      }}
    >
      <div className="z-10 relative grid mx-0 sm:mx-auto h-full container">
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
              <Button
                className="flex justify-center items-center shadow-[inset_0px_0px_12px_rgba(255,255,255,0.6)] border rounded-full w-[330px] h-[53.5px] font-semibold text-white text-lg hover:scale-105 transition-all duration-300 hero-button-gradient"
                style={{ padding: "16px" }}
                onClick={() => window.open(SKOOL_COMMUNITY_URL, "_blank")}
              >
                <span className="mr-2">Bắt đầu hành trình</span>
                <ArrowRightIcon className="w-5 h-5 font-bold transition-transform group-hover:translate-x-1 duration-200" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
