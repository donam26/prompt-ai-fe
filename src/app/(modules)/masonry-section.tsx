"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES_URL } from "@/constants/routes-url";
import Masonry from "react-masonry-css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { MasonryCard } from "@/components/ui";

import "swiper/css";
import "swiper/css/pagination";
import { ArrowRightIcon } from "lucide-react";

interface MasonrySectionProps {
  className?: string;
}

export const MasonrySection: React.FC<MasonrySectionProps> = ({
  className = "",
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const masonryData = [
    {
      id: 1,
      type: "image" as const,
      image: "/images/home/masonry/masonry-1.png",
      alt: "Masonry Image 1",
    },
    {
      id: 2,
      type: "image" as const,
      image: "/images/home/masonry/masonry-2.png",
      alt: "Masonry Image 2",
    },
    {
      id: 3,
      type: "image" as const,
      image: "/images/home/masonry/masonry-4.png",
      alt: "Masonry Image 3",
    },
    {
      id: 4,
      type: "image" as const,
      image: "/images/home/masonry/masonry-5.png",
      alt: "Masonry Image 4",
    },
    {
      id: 5,
      type: "image" as const,
      image: "/images/home/masonry/masonry-6.png",
      alt: "Masonry Image 5",
    },
    {
      id: 6,
      type: "image" as const,
      image: "/images/home/masonry/masonry-7.png",
      alt: "Masonry Image 6",
    },
    {
      id: 7,
      type: "image" as const,
      image: "/images/home/masonry/masonry-8.png",
      alt: "Masonry Image 7",
    },
  ];

  return (
    <div className={`max-w-[1200px] mx-auto ${className}`}>
      <div className="px-4">
        <div className="flex items-center bg-[#DACDFF] mx-auto mb-4 px-4 rounded-full w-fit h-full font-medium text-[#5700C6] text-md text-center">
          <p>
            Chúng tôi đã giúp hàng trăm thương hiệu như của bạn và muốn bạn trở
            thành câu chuyện thành công tiếp theo
          </p>
        </div>
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-6 font-bold text-[#1D1E25] text-4xl md:text-5xl">
            Hãy gia nhập cùng hàng trăm founder khác đã bứt phá tăng trưởng mạnh
            mẽ tại đây!
          </h2>
          <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
            <button
              type="button"
              onClick={() => router.push(ROUTES_URL.PRICING)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full font-semibold text-white transition-colors"
            >
              Đăng Ký Ngay!
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <button
              onClick={() => router.push(ROUTES_URL.CONTACT)}
              className="flex items-center gap-2 bg-transparent px-8 py-4 border-2 border-purple-600 rounded-full font-semibold text-purple-600 transition-colors"
            >
              Xem thêm các phản hồi
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Masonry Grid / Slider */}
        {isMobile ? (
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
              clickable: true,
              dynamicBullets: true,
              dynamicMainBullets: 3,
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          >
            {masonryData.map(item => (
              <SwiperSlide key={item.id}>
                <MasonryCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="masonry-grid"
            columnClassName="masonry-grid_column"
          >
            {masonryData.map(item => (
              <MasonryCard key={item.id} data={item} />
            ))}
          </Masonry>
        )}
      </div>
    </div>
  );
};
