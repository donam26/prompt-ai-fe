import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { MARKETPLACE_CARDS } from "@/constants";

export const HowToUseSection = () => {
  return (
    <section className="bg-gray-50 px-4 py-16 sm:py-20">
      <div className="mx-auto container">
        <div className="mb-12 sm:mb-16 text-center">
          <h2 className="mb-4 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="bg-clip-text bg-gradient-to-r from-[#5700C6] to-[#001AFF] text-transparent">
              Cách sử dụng thư viện Prompt AI
            </span>
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-gray-600 text-base sm:text-lg">
            Nâng cao hiệu quả và gia tăng năng suất công việc với hàng nghìn
            Prompt AI chuyên sâu
          </p>
          <Link href="/thu-vien-prompt">
            <Button
              variant="outline"
              className="hover:bg-[#5700C6]/10 border-[#5700C6] hover:border-[#4a00a8] text-[#5700C6] hover:text-[#4a00a8] transition-all duration-200"
            >
              Xem thêm <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {MARKETPLACE_CARDS.map((card, index) => (
            <Card
              key={card.id}
              className="group relative bg-white hover:shadow-xl overflow-hidden hover:scale-105 transition-all duration-300 transform"
            >
              <div className="z-10 absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="z-20 relative p-4 sm:p-6 text-white">
                <div className="inline-block bg-white/20 mb-2 px-2 py-1 rounded-full font-semibold text-[#5700C6] text-sm">
                  Bước {index + 1}
                </div>
                <h3 className="mb-2 font-bold text-lg sm:text-xl">
                  {card.title}
                </h3>
                <p className="opacity-90 text-sm sm:text-base">
                  {card.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
