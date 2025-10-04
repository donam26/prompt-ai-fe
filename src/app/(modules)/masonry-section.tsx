"use client";

import Masonry from "react-masonry-css";
import { MasonryCard } from "@/components/ui";

interface MasonrySectionProps {
  className?: string;
}

export const MasonrySection: React.FC<MasonrySectionProps> = ({
  className = "",
}) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1,
  };

  const masonryData = [
    {
      id: 1,
      type: "group" as const,
      title: "Làm Video cùng AI",
      subtitle: "Nhóm Riêng tư - 6,9K thành viên",
      content: {
        author: "Nguyễn Thanh Hiếu",
        time: "2 Người đóng góp nhiều nhất - 1 phút",
        post: "Kênh mình đã được 1 tháng tuổi rồi các bạn ơi! 🎉\n\n📊 Thống kê hiện tại:\n• 417 subscriber\n• 30k views\n• Gần 3k giờ xem",
        achievement: {
          title: "Thành tựu mới",
          description: "30.000 lượt xem",
          detail:
            "Người xem đang quan tâm và dành nhiều thời gian để xem video của bạn hơn",
        },
      },
    },
    {
      id: 2,
      type: "testimonial" as const,
      author: "Agnes Wirawan",
      role: "IT Specialist, SkyCom Network",
      content:
        "Data security is a top priority for us. With encrypted channels and detailed audit logs, we know our surveillance data is well-protected. It's the kind of trust you want in a critical system.",
    },
    {
      id: 3,
      type: "profile" as const,
      author: "Thang Hoang",
      username: "@hoavosac477",
      time: "Người đóng góp nhiều nhất - 26 Tháng 9 lúc 09:29",
      stats: {
        following: "122",
        followers: "37,0K",
        likes: "386,8K",
      },
      content:
        "Phụ Nữ là loài Hoa không màu Rực rỡ thế nào ?.. là do chính tay mình Tô !",
    },
    {
      id: 4,
      type: "testimonial" as const,
      author: "Maya Rizky",
      role: "Operations Lead, Logistics",
      content:
        "Our logistics operations rely heavily on real-time awareness. This platform has not only reduced manual surveillance tasks, but also provided automated insights that help us take action faster and more accurately.",
    },
    {
      id: 5,
      type: "project" as const,
      title: "BREAD FACTORY CHRISTMAS",
      image: "/images/cta/cta-home.png",
      content:
        "Tôi đã tạo ra một thiết kế poster 3D cho chương trình Giáng sinh của Bread Factory. Thiết kế này được lấy cảm hứng từ menu Giáng sinh của họ và tôi rất hài lòng với kết quả. Tôi nghĩ nên chia sẻ nó trên story của mình!",
    },
    {
      id: 6,
      type: "project" as const,
      title: "HENRY SHI",
      image: "/images/cta/cta1.png",
      content:
        "Dự án 'Coin Tape' này thật tuyệt! Tôi đã chuyển đổi 20 style khác nhau để tạo ra sự tương phản giữa mặt trước và mặt sau. Kết quả đơn giản nhưng ấn tượng.",
    },
    {
      id: 7,
      type: "post" as const,
      author: "Khắc Anh",
      date: "18 tháng 10, 2024",
      image: "/images/cta/cta2.png",
      content:
        "Cảm ơn anh Hiếu và team 'Ăn Ngủ Cùng AI' đã hướng dẫn và cung cấp những công cụ AI hữu ích. Nhờ có các bạn mà mình đã học được rất nhiều điều mới mẻ trong lĩnh vực AI. Chúc các bạn thành công hơn nữa! 🙏",
      engagement: {
        likes: "Nguyễn Đình Hiếu, Ăn Ngủ Cùng AI và 276 người khác",
        comments: "8 bình luận",
      },
    },
    {
      id: 8,
      type: "announcement" as const,
      author: "Ăn Ngủ Cùng AI",
      role: "Quản trị viên",
      time: "Người đóng góp nổi bật - 2 tháng 1-0",
      content:
        "🎉 Tài liệu 'Midjourney từ A-Z' MIỄN PHÍ! 📚\n\nTài liệu này mình đã mua với giá $80 (2 triệu VND) và team đã dịch sang tiếng Việt cho các bạn. ;)",
      engagement: {
        likes: "Vũ Thuý Hằng, Nguyễn Đình Hiếu và 382 người khác",
        comments: "247 bình luận",
      },
    },
    {
      id: 9,
      type: "testimonial" as const,
      author: "Rafi Nurhadi",
      role: "Engineer, Pertamina",
      content:
        "Remote mining operations can be risky and hard to monitor. The AI-powered system identifies movement and anomalies without delay, making our sites safer and more efficient to manage.",
    },
  ];

  return (
    <section className={`max-w-[1200px] mx-auto ${className}`}>
      <div className="mx-auto px-4 container">
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
            <button className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full font-semibold text-white transition-colors">
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
            <button className="flex items-center gap-2 bg-transparent px-8 py-4 border-2 border-purple-600 rounded-full font-semibold text-purple-600 transition-colors">
              Xem thêm các phản hồi
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
          </div>
        </div>

        {/* Masonry Grid */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {masonryData.map(item => (
            <MasonryCard key={item.id} data={item} />
          ))}
        </Masonry>
      </div>
    </section>
  );
};
