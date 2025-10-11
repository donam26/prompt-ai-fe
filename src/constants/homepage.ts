// Homepage constants and data

export interface MarketplaceCard {
  id: number;
  title: string;
  description: string;
  imgSrc: string;
  bgColor: string;
}

export interface Testimonial {
  rating: number;
  text: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

export interface PromptCard {
  title: string;
  subtitle: string;
  cardLabel: string;
}

export interface SolutionData {
  subtitle: string;
  prompts: PromptCard[];
  imgSrc: string;
}

export const MARKETPLACE_CARDS: MarketplaceCard[] = [
  {
    id: 1,
    title: "Truy cập thư viện Prompt",
    description: "Truy cập vào thư viện Prompt của chúng tôi",
    imgSrc: "/images/tutorials/huong_dan_hinh_1.png",
    bgColor: "orange",
  },
  {
    id: 2,
    title: "Lựa chọn Prompt",
    description:
      "Hãy chọn Prompt phù hợp với ngành nghề hoặc nhu cầu hiện tại của bạn",
    imgSrc: "/images/tutorials/huong_dan_hinh_2.png",
    bgColor: "orange",
  },
  {
    id: 3,
    title: "Cá nhân hóa Prompt",
    description:
      "Hãy điền thêm các thông tin để AI có thể hiểu rõ yêu cầu của bạn hơn",
    imgSrc: "/images/tutorials/huong_dan_hinh_3.png",
    bgColor: "blue",
  },
  {
    id: 4,
    title: "Tận hưởng kết quả",
    description:
      "Tận hưởng kết quả tuyệt vời mà AI mang lại. Bạn có thể tùy chỉnh nếu chưa vừa ý",
    imgSrc: "/images/tutorials/huong_dan_hinh_4.png",
    bgColor: "teal",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    rating: 5,
    text: "Thư viện quá rộng lớn, chứa đầy những Prompts hữu ích, tôi đã đưa cho nhân viên dưới tôi những Prompts tương ứng với bộ phận của họ, hiệu suất tăng vọt trong thời gian rất ngắn!",
    author: {
      name: "Jason Trịnh",
      title: "CEO",
      avatar: "/images/avatars/avatar_1.png",
    },
  },
  {
    rating: 5,
    text: "Midjourney Prompts giúp tôi rất nhiều trong việc design web và tạo các element đẹp mắt! Đồng thời những prompt về Sales và Marketing hỗ trợ tôi bán hàng dễ hơn bao giờ hết!",
    author: {
      name: "Phương Hoàng",
      title: "Web Designer",
      avatar: "/images/avatars/avatar_3.png",
    },
  },
  {
    rating: 5,
    text: "Trước đây tôi phải mất hàng giờ để soạn email chào hàng, giờ chỉ cần chọn prompt phù hợp là có ngay nội dung chuyên nghiệp, tối ưu tỉ lệ chuyển đổi!",
    author: {
      name: "Minh Tú",
      title: "Sales Executive",
      avatar: "/images/avatars/avatar_3.png",
    },
  },
];

export const SOLUTIONS_DATA: Record<string, SolutionData> = {
  Solopreneur: {
    subtitle:
      "Không còn loay hoay một mình – prompt AI thiết kế riêng giúp bạn tự viết content, email, pitch deck… đóng vai trò như một team hỗ trợ 24/7.",
    prompts: [
      {
        title: "Tối ưu chiến lược định giá sản phẩm",
        subtitle:
          "Tối đa hóa lợi nhuận bằng cách xây dựng chiến lược định giá theo từng tầng, dựa trên phân tích thị trường và giá trị sản phẩm mà sản phẩm mang lại.",
        cardLabel: "ChatGPT",
      },
      {
        title: "Tìm kiếm ý tưởng kinh doanh tiềm năng",
        subtitle:
          "Khám phá các cơ hội kinh doanh online tiềm năng được thiết kế dành riêng cho solopreneurs đang tìm cách gia tăng nguồn thu nhập.",
        cardLabel: "ChatGPT",
      },
    ],
    imgSrc: "/images/solution/solopreneur.jpg",
  },
  "Content Creator": {
    subtitle:
      "Viết đúng, viết nhanh, viết đúng insight ngành – nhờ prompt AI cá nhân hóa theo từng yêu cầu, từng lĩnh vực và từng khách hàng của bạn.",
    prompts: [
      {
        title: "Viết kịch bản video TikTok",
        subtitle:
          "Soạn thảo kịch bản video hấp dẫn, tập trung vào insight của khách hàng, lợi ích sản phẩm, và lời kêu gọi hành động (CTA) rõ ràng.",
        cardLabel: "ChatGPT",
      },
      {
        title: "Tạo nội dung quảng cáo hiệu quả trên Facebook",
        subtitle:
          "Viết nội dung quảng cáo Facebook có tỷ lệ chuyển đổi cao, tận dụng tâm lý sợ bỏ lỡ (FOMO) để tối đa hóa khả năng mua hàng và gia tăng tương tác.",
        cardLabel: "ChatGPT",
      },
    ],
    imgSrc: "/images/solution/content-creator.jpg",
  },
  Sales: {
    subtitle:
      "Gợi mở hội thoại, xử lý từ chối và chốt deal dễ dàng hơn nhờ hệ thống prompt được xây dựng theo hành trình khách hàng.",
    prompts: [
      {
        title: "Tạo mẫu email tiếp cận cold lead",
        subtitle:
          "Tương tác hiệu quả với cold lead, giúp bạn xây dựng các mẫu email tiếp cận được cá nhân hóa, giải quyết những điểm đau chính và thúc đẩy phản hồi từ khách hàng.",
        cardLabel: "ChatGPT",
      },
      {
        title: "Tự động hóa quy trình bán hàng bằng công cụ CRM",
        subtitle:
          "Tối ưu hóa quy trình bán hàng của bạn, hướng dẫn triển khai, tùy chỉnh và tối ưu hóa các công cụ CRM.",
        cardLabel: "ChatGPT",
      },
    ],
    imgSrc: "/images/solution/sales.jpg",
  },
};

export interface BrandLogo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const HERO_SHOWCASE: BrandLogo[] = [
  {
    src: "/images/home/brands/tg_vingroup_logo.png",
    alt: "Vingroup",
    width: 120,
    height: 60,
  },
  {
    src: "/images/home/brands/tg_vingroup_logo_1.png",
    alt: "Vingroup",
    width: 120,
    height: 60,
  },
  {
    src: "/images/home/brands/tg_tech_logo.png",
    alt: "TechComBank",
    width: 120,
    height: 60,
  },
  {
    src: "/images/home/brands/tg_vib_logo.png",
    alt: "VIB",
    width: 120,
    height: 60,
  },
  {
    src: "/images/home/brands/tg_mb_logo.png",
    alt: "MB Bank",
    width: 120,
    height: 60,
  },
  {
    src: "/images/home/brands/tg_msb_logo.png",
    alt: "MSB",
    width: 120,
    height: 60,
  },
  {
    src: "/images/home/brands/tg_mcredit_logo.png",
    alt: "MCredit",
    width: 120,
    height: 60,
  },
  {
    src: "/images/home/brands/tg_bank_logo.png",
    alt: "TPBank",
    width: 120,
    height: 60,
  },
  {
    src: "/images/home/brands/logo10.png",
    alt: "Partner Logo 10",
    width: 120,
    height: 60,
  },
  {
    src: "/images/home/brands/logo11.png",
    alt: "Partner Logo 11",
    width: 120,
    height: 60,
  },
  {
    src: "/images/home/brands/logo12.png",
    alt: "Partner Logo 12",
    width: 120,
    height: 60,
  },
];

export const CHROME_EXTENSION_URL =
  "https://chromewebstore.google.com/detail/prom-nâng-cấp-prompt/gpcjhobhbnoifjkhgongdbggeljjpfif";

export const SKOOL_COMMUNITY_URL =
  "https://www.skool.com/prom-aihub/about?ref=1a6136e6caba48bcaf8d6a8120bc0cb8";
