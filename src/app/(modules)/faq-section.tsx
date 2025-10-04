"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isExpanded?: boolean;
}

interface Props {
  className?: string;
}

export const FAQSection: React.FC<Props> = ({ className = "" }) => {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([
    {
      id: 1,
      question: "Thư viện AI Prompt là gì và tại sao bạn cần nó?",
      answer:
        "Thư viện AI Prompt là một bộ sưu tập có tổ chức các câu lệnh và hướng dẫn được thiết kế để tối ưu hóa việc tương tác với các mô hình AI. Nó giúp người dùng tiết kiệm thời gian, tăng độ chính xác và đạt được kết quả tốt hơn khi làm việc với AI. Với thư viện này, bạn không cần phải thử nghiệm từ đầu mà có thể sử dụng những prompt đã được kiểm chứng và tối ưu hóa.",
      isExpanded: true,
    },
    {
      id: 2,
      question:
        "Thư viện AI Prompt có thể giúp doanh nghiệp phát triển như thế nào?",
      answer:
        "Thư viện AI Prompt giúp doanh nghiệp tăng hiệu quả làm việc, giảm chi phí vận hành và nâng cao chất lượng sản phẩm dịch vụ. Các doanh nghiệp có thể sử dụng để tự động hóa các quy trình, tạo nội dung marketing, phân tích dữ liệu, hỗ trợ khách hàng và nhiều ứng dụng khác.",
    },
    {
      id: 3,
      question:
        "Những danh mục nào trong Thư viện nhắc nhở AI có giá trị nhất đối với các doanh nghiệp nhỏ?",
      answer:
        "Đối với doanh nghiệp nhỏ, các danh mục có giá trị nhất bao gồm: Marketing & Content Creation (tạo nội dung quảng cáo, bài viết blog), Customer Service (hỗ trợ khách hàng tự động), Business Analysis (phân tích dữ liệu kinh doanh), và Productivity Tools (công cụ tăng năng suất làm việc).",
    },
    {
      id: 4,
      question:
        "Làm thế nào để tận dụng tối đa giá trị của Thư viện nhắc nhở AI?",
      answer:
        "Để tận dụng tối đa, hãy bắt đầu với những prompt phù hợp với nhu cầu cụ thể của bạn, tùy chỉnh chúng theo ngữ cảnh và mục tiêu riêng, thường xuyên cập nhật và mở rộng thư viện, đồng thời chia sẻ kinh nghiệm với cộng đồng để học hỏi thêm.",
    },
    {
      id: 5,
      question: "Điều gì tạo nên lời nhắc AI tốt cho mục đích kinh doanh?",
      answer:
        "Một prompt AI tốt cho kinh doanh cần có mục tiêu rõ ràng, ngữ cảnh cụ thể, định dạng output mong muốn, và các ràng buộc về chất lượng. Nó cũng nên được tối ưu hóa cho từng ngành nghề và quy mô doanh nghiệp cụ thể.",
    },
  ]);

  const handleToggleFAQ = (id: number) => {
    setFaqItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, isExpanded: !item.isExpanded } : item
      )
    );
  };

  return (
    <section
      className={`py-16 faq-section max-w-[1400px] mx-auto  ${className}`}
    >
      <div className="mx-auto px-4 container">
        <div className="items-start gap-12 grid lg:grid-cols-2">
          {/* Left Column - Questions Info */}
          <div className="space-y-6">
            <div>
              <h2 className="mb-6 font-bold text-gray-900 text-4xl md:text-5xl">
                Câu hỏi
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Những hướng dẫn giúp bạn làm chủ cách viết Prompt. Vẫn còn thắc
                mắc? Hãy khám phá các hướng dẫn của chúng tôi hoặc thử tạo một
                Prompt ngay bây giờ!
              </p>
            </div>

            <div className="flex sm:flex-row flex-col gap-4">
              <button className="bg-purple-100 hover:bg-purple-200 px-6 py-3 rounded-full font-semibold text-purple-700 transition-colors">
                More Questions
              </button>
              <a
                href="#"
                className="self-center text-gray-900 hover:text-purple-600 underline transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="space-y-4">
            {faqItems.map(item => (
              <div
                key={item.id}
                className={cn(
                  "faq-accordion-item",
                  item.isExpanded && "expanded"
                )}
              >
                <button
                  onClick={() => handleToggleFAQ(item.id)}
                  className="faq-question-button"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="faq-question-text">{item.question}</h3>
                    <div className="flex-shrink-0">
                      <svg
                        className={cn(
                          "faq-icon",
                          item.isExpanded && "expanded"
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  </div>
                </button>

                <div
                  className={cn(
                    "faq-answer-container",
                    item.isExpanded
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  )}
                >
                  <div className="faq-answer-content">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
