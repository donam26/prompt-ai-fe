"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ROUTES_URL } from "@/constants/routes-url";

export const CTASection = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (user) {
      router.push(ROUTES_URL.THU_VIEN_PROMPT);
    } else {
      router.push(ROUTES_URL.LOGIN);
    }
  };

  return (
    <section className="px-4 py-10">
      <div className="mx-auto container">
        <Card className="bg-gradient-to-r from-[#5700c6] to-[#e6b8ff] p-12 text-white text-center">
          <h2 className="mb-4 font-bold text-3xl md:text-4xl">
            x10 Hiệu Suất Nhờ Sử Dụng Prompt AI Ngay Hôm Nay
          </h2>
          <Button
            size="lg"
            className="bg-white hover:bg-gray-100 mt-6 text-purple-600"
            onClick={handleClick}
          >
            Sử Dụng MIỄN PHÍ Ngay🔥
          </Button>
        </Card>
      </div>
    </section>
  );
};
