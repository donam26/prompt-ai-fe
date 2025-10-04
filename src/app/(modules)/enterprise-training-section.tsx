"use client";

import { CTAButton } from "@/components/ui";
import Image from "next/image";

const EnterpriseTrainingSection = () => {
  return (
    <div className="relative bg-enterprise-gradient mb-8 p-8 rounded-2xl overflow-hidden">
      <div className="items-center gap-8 grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Content */}
        <div className="z-10 relative">
          <h2 className="mb-6 font-bold text-white text-2xl 2xl:text-4xl leading-tight">
            Prom Team cùng các Đại sứ AI không chỉ dừng ở cộng đồng học tập, mà
            còn mang đến chương trình đào tạo chuyên sâu, thiết kế riêng cho
            từng nhu cầu:
          </h2>

          <div className="space-y-6 mb-8">
            <div>
              <p className="text-gray-300 text-lg leading-relaxed">
                <span className="font-bold text-white">Doanh nghiệp:</span> {""}
                <span className="text-base">
                  {" "}
                  Xây dựng lộ trình áp dụng AI vào marketing, bán hàng, vận hành
                  và chăm sóc khách hàng. Giúp tiết kiệm chi phí, tăng năng suất
                  và mở rộng quy mô nhanh chóng.
                </span>
              </p>
            </div>

            <div>
              <p className="text-gray-300 text-lg leading-relaxed">
                <span className="font-bold text-white">Cá nhân:</span> {""}
                <span className="text-base">
                  {" "}
                  Học trọn bộ skillset AI thực chiến từ cơ bản đến nâng cao – từ
                  Prompt Engineering, tạo nội dung, đến automation – để bạn có
                  thể làm việc thông minh hơn và tạo thu nhập từ AI.
                </span>
              </p>
            </div>

            <p className="text-gray-300 text-base leading-relaxed">
              Với sự đồng hành của các chuyên gia và Đại sứ đang trực tiếp vận
              hành startup & doanh nghiệp thật, mọi khóa học đều mang tính ứng
              dụng cao và tạo ra kết quả thực tế.
            </p>
          </div>

          <CTAButton
            variant="gradient"
            size="lg"
            onClick={() => {
              /* Register now */
            }}
            icon={
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            }
            iconPosition="right"
            className="w-[275px]"
          >
            Đăng ký ngay
          </CTAButton>
        </div>

        {/* Right Side - AI Hands Illustration */}
        <div className="z-10 relative flex justify-center">
          <Image
            src="/images/home/comprehensive/enterprise-training-section.png"
            alt="Enterprise Training Section"
            width={640}
            height={550}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default EnterpriseTrainingSection;
