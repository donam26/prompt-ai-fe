import Image from "next/image";
import { MENTORS } from "@/constants/mentors";
import { ArrowRightIcon } from "lucide-react";
import { SKOOL_COMMUNITY_URL } from "@/constants/homepage";

interface StatItemProps {
  icon: string;
  alt: string;
  value: string;
  description: string;
}

const StatItem = ({ icon, alt, value, description }: StatItemProps) => (
  <div className="text-center">
    <div className="flex justify-center mb-4">
      <div className="flex justify-center items-center rounded-full w-16 h-16">
        <Image src={icon} alt={alt} width={60} height={55} />
      </div>
    </div>
    <h3 className="mb-2 font-bold text-gray-900 text-3xl lg:text-4xl">
      {value}
    </h3>
    <p className="text-gray-600 text-lg">{description}</p>
  </div>
);

export const TeamsSection = () => {
  return (
    <section className="bg-white mx-auto max-w-[1200px]">
      <div className="mx-auto container">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 font-bold text-4xl lg:text-5xl">
            <span className="text-gray-900">Đồng hành cùng</span>{" "}
            <span className="bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 text-transparent">
              Prom team{" "}
            </span>
            <span className="text-gray-900">
              qua các buổi Q&A / livestream mỗi tuần
            </span>
          </h2>
          <p className="mx-auto max-w-5xl font-medium text-gray-600 text-lg">
            Giải đáp mọi thắc mắc, gỡ những bottle-neck trong doanh nghiệp hoặc
            hoạt động kinh doanh
          </p>
        </div>

        {/* Mentors Slider - Continuous Loop */}
        <div className="relative mb-16 overflow-hidden">
          {/* Left gradient fade */}
          <div className="top-0 bottom-0 left-0 z-10 absolute bg-gradient-to-r from-white to-transparent w-20 pointer-events-none" />

          {/* Right gradient fade */}
          <div className="top-0 right-0 bottom-0 z-10 absolute bg-gradient-to-l from-white to-transparent w-20 pointer-events-none" />

          {/* Slider wrapper - Continuous scroll  */}
          <div className="flex animate-scroll">
            {[...MENTORS, ...MENTORS, ...MENTORS].map((mentor, index) => (
              <div
                key={`${mentor.id}-${index}`}
                className="flex-shrink-0 mx-2 md:mx-3"
              >
                <div className="group relative">
                  {/* Mentor Card */}
                  <div className="relative rounded-2xl w-56 md:w-[370px] h-72 md:h-[509px] overflow-hidden">
                    {/* Background Image */}
                    <Image
                      src={mentor.image}
                      alt={mentor.name}
                      fill
                      className="object-cover transition-opacity duration-300"
                      quality={90}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Content */}
                    <div className="right-0 bottom-0 left-0 absolute p-4 md:p-6 text-white">
                      <h3 className="mb-1 md:mb-2 font-bold text-lg md:text-2xl">
                        {mentor.name}
                      </h3>
                      <p className="mb-1 md:mb-2 text-purple-200 text-xs md:text-sm">
                        {mentor.role}
                      </p>
                      <p className="font-medium text-white text-xs md:text-sm">
                        {mentor.achievement}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Value Statistics Section */}

        <div className="text-center">
          <h2 className="mb-6 font-bold text-3xl lg:text-4xl">
            <span className="text-gray-900">Giá trị</span>{" "}
            <span className="text-[#5700C6]">thị trường</span>{" "}
            <span className="text-gray-900">của cộng đồng</span>
          </h2>

          {/* Statistics Grid */}
          <div className="gap-8 lg:gap-12 grid grid-cols-1 md:grid-cols-3 mb-12">
            <StatItem
              icon="/images/home/mentors/g643.png"
              alt="Followers"
              value="1.5 triệu"
              description="Người theo dõi"
            />
            <StatItem
              icon="/images/home/mentors/group.png"
              alt="Businesses"
              value="80+ Doanh Nghiệp"
              description="Đang hợp tác"
            />
            <StatItem
              icon="/images/home/mentors/money-bag.png"
              alt="Revenue"
              value="200 TỶ"
              description="Doanh thu trong hợp đồng"
            />
          </div>

          {/* Call to Action Button */}
          <div className="text-center">
            <a
              href={SKOOL_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center shadow-lg hover:shadow-xl px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 transform"
              style={{
                background: "linear-gradient(90deg, #5700C6 0%, #3F09A8 100%)",
                color: "white",
                border: "none",
                textDecoration: "none",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #6B1AD1 0%, #5700C6 100%)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background =
                  "linear-gradient(90deg, #5700C6 0%, #3F09A8 100%)";
              }}
            >
              Đăng Ký Ngay!
              <ArrowRightIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
