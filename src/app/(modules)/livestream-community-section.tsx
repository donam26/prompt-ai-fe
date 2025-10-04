"use client";

import Image from "next/image";

const LivestreamCommunitySection = () => {
  return (
    <div className="gap-6 grid grid-cols-1 lg:grid-cols-2 mb-8">
      {/* Left Section - Livestream & Q&A */}
      <div className="relative bg-ai-modules-gradient p-8 rounded-2xl overflow-hidden">
        <div className="z-10 relative">
          <h2 className="mb-6 font-bold text-white text-3xl lg:text-4xl leading-tight">
            Livestream & Q/A Music Session Hàng Tuần!
          </h2>
          <p className="mb-8 text-gray-300 text-base leading-relaxed">
            Giải đáp & Tháo gỡ mọi khó khăn của bạn qua những buổi gặp mặt cùng
            Prom team! Chúng tôi ở đây để giúp bạn thắng cuộc!
          </p>

          {/* Live Stream Logo */}
          <div className="flex justify-center">
            <Image
              src="/images/home/comprehensive/livestream-community-section.png"
              alt="Livestream Community Section"
              width={556}
              height={357}
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Right Section - Community */}
      <div className="relative bg-livestream-gradient p-8 rounded-2xl overflow-hidden">
        <div className="z-10 relative">
          <h2 className="mb-6 font-bold text-gray-800 text-3xl lg:text-4xl leading-tight">
            Cộng Đồng Chất Lượng Dành Riêng Cho Gen-Z & AI-first Entrepreneur
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            Prom AI Hub quy tụ những bạn trẻ cùng tư duy Gen-Z, yêu thích công
            nghệ và khởi nghiệp với AI. Tất cả thành viên đều có nền tảng kiến
            thức chung, dễ dàng kết nối và học hỏi lẫn nhau.
          </p>

          {/* Chat Bubbles */}
          <div className="flex justify-center">
            <Image
              src="/images/home/comprehensive/chat-bubbles-section.png"
              alt="Chat Bubbles"
              width={556}
              height={357}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivestreamCommunitySection;
