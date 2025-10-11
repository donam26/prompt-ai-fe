"use client";

import Image from "next/image";
const AIModulesSection = () => {
  return (
    <div className="gap-6 grid grid-cols-1 lg:grid-cols-2">
      {/* Left Section - AI Modules Learning */}
      <div>
        <div className="relative bg-ai-modules-gradient p-8 rounded-2xl rounded-b-none overflow-hidden">
          <div className="z-10 relative grid">
            <h2 className="mb-6 font-bold text-white text-3xl lg:text-4xl leading-tight">
              Học Modules AI Từ Chính Những Chuyên Gia Thực Chiến
            </h2>
            <p className="mb-8 text-gray-300 text-lg leading-relaxed">
              Các modules thực tế từ chuyên gia hàng đầu, bao gồm marketing,
              hình ảnh & video, tự động hóa và chiến lược kinh doanh. Học từ
              những người đã thành công thực sự.
            </p>
          </div>
        </div>
        {/* Cat Illustrations */}
        <div className="rounded-2xl rounded-t-none overflow-hidden">
          <Image
            src="/images/home/comprehensive/cat-Illustrations.jpg"
            alt="AI Modules Section"
            width={640}
            height={250}
            className="w-full h-full object-c"
          />
        </div>
      </div>

      {/* Right Section - Secret Modules */}
      <div className="relative bg-secret-modules-gradient p-8 pb-0 rounded-2xl overflow-hidden">
        <div className="z-10 relative grid h-full">
          <h2 className="mb-6 font-bold text-white text-3xl lg:text-4xl leading-tight">
            Các Modules bí mật ?
          </h2>
          <p className="mb-6 text-gray-300 text-lg leading-relaxed">
            Tại Prom AI Hub, chúng tôi sẽ chỉ cho bạn những skillset mà không ở
            đâu tại Việt Nam có!
          </p>

          {/* Secret Module Images */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="relative flex-1">
              <Image
                src="/images/home/comprehensive/jailbreak.png"
                alt="Jailbreak Module"
                width={361}
                height={78}
                className="rounded-xl object-cover"
              />
            </div>

            <div className="relative flex-1">
              <Image
                src="/images/home/comprehensive/deepfake.png"
                alt="Deepfake Module"
                width={223}
                height={50}
                className="rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Robot Illustration */}
          <div className="flex justify-center">
            <Image
              src="/images/home/comprehensive/robot-illustration.png"
              alt="Robot Illustration"
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

export default AIModulesSection;
