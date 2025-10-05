/**
 * Pricing constants and configuration
 */

export interface PricingFeature {
  readonly content: string;
  readonly included: boolean;
}

export const PRICING_FEATURES = {
  title: "Tại sao chọn PROM?",
  subtitle: "Công cụ AI hàng đầu giúp bạn tối ưu hóa công việc",
  features: [
    {
      icon: "/icons/features/creative-icon.png",
      title: "Sáng tạo không giới hạn",
      description: "Tạo ra những prompt độc đáo và hiệu quả cho mọi nhu cầu",
    },
    {
      icon: "/icons/features/iconpromotimiz.png",
      title: "Tối ưu hóa AI",
      description: "Công nghệ AI tiên tiến giúp tối ưu hóa prompt của bạn",
    },
    {
      icon: "/icons/features/icontask.png",
      title: "Tiết kiệm thời gian",
      description:
        "Giảm 80% thời gian tạo prompt so với phương pháp truyền thống",
    },
    {
      icon: "/icons/features/standard-icon.png",
      title: "Chất lượng chuẩn",
      description: "Tất cả prompt đều được kiểm duyệt và tối ưu hóa",
    },
  ],
} as const;

export const PRICING_FAQ = {
  title: "Câu hỏi thường gặp",
  subtitle: "Tìm hiểu thêm về dịch vụ của chúng tôi",
  faqs: [
    {
      question: "Tôi có thể thay đổi gói dịch vụ bất cứ lúc nào không?",
      answer:
        "Có, bạn có thể nâng cấp hoặc hạ cấp gói dịch vụ bất cứ lúc nào. Thay đổi sẽ có hiệu lực ngay lập tức.",
    },
    {
      question: "Có hỗ trợ hoàn tiền không?",
      answer:
        "Chúng tôi cung cấp chính sách hoàn tiền 30 ngày cho tất cả gói dịch vụ trả phí.",
    },
    {
      question: "Tôi có thể sử dụng trên nhiều thiết bị không?",
      answer:
        "Có, bạn có thể đăng nhập và sử dụng trên tối đa 5 thiết bị cùng lúc với một tài khoản.",
    },
    {
      question: "Có hỗ trợ tích hợp với các công cụ khác không?",
      answer:
        "Có, chúng tôi hỗ trợ tích hợp với hơn 10+ AI tools phổ biến như ChatGPT, Claude, Midjourney...",
    },
    {
      question: "Dữ liệu của tôi có được bảo mật không?",
      answer:
        "Tuyệt đối. Chúng tôi sử dụng mã hóa end-to-end và tuân thủ các tiêu chuẩn bảo mật quốc tế.",
    },
  ],
} as const;

export const PRICING_CTA = {
  title: "Sẵn sàng bắt đầu?",
  subtitle: "Tham gia cùng hàng nghìn người dùng đã tin tưởng PROM",
  buttonText: "Bắt đầu ngay hôm nay",
  buttonSecondaryText: "Liên hệ tư vấn",
} as const;

export const PRICING_CONFIG = {
  defaultPeriod: "monthly" as const,
  currency: "VND" as const,
  showYearlyDiscount: true,
  yearlyDiscountPercent: 25,
} as const;
