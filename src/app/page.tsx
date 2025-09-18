"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { promptService, blogService } from "@/services";
import { Prompt, Blog } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Download, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  MARKETPLACE_CARDS,
  TESTIMONIALS,
  SOLUTIONS_DATA,
  PARTNERS,
  CHROME_EXTENSION_URL,
} from "@/constants";

function timeSince(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return `${interval} năm trước`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return `${interval} tháng trước`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return `${interval} ngày trước`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return `${interval} giờ trước`;
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return `${interval} phút trước`;
  }
  return "Vừa xong";
}

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [newestPrompts, setNewestPrompts] = useState<Prompt[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [activeTag, setActiveTag] =
    useState<keyof typeof SOLUTIONS_DATA>("Solopreneur");
  const [animateCards, setAnimateCards] = useState(false);

  const getListNewestPrompts = async () => {
    try {
      const response = await promptService.getPromptsByCategoryId({
        page: 1,
        pageSize: 8,
        categoryId: 8,
        searchText: "",
        industryId: "",
        isType: 1,
      });
      setNewestPrompts(response.data.data);
    } catch {
      // Error fetching newest prompts - could be logged to monitoring service
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await blogService.getBlogPage({
        page: 1,
        pageSize: 3,
        search: "",
      });
      setBlogs(response.data.data || []);
    } catch {
      // Error fetching blogs - could be logged to monitoring service
    }
  };

  const handleTagChange = (tag: keyof typeof SOLUTIONS_DATA) => {
    if (tag === activeTag) return;

    // Kích hoạt animation
    setAnimateCards(true);

    // Đặt timer để tắt hiệu ứng animation sau một khoảng thời gian
    setTimeout(() => {
      setAnimateCards(false);
    }, 700);

    // Cập nhật tag active
    setActiveTag(tag);
  };

  const handleClick = () => {
    if (user) {
      router.push("/thu-vien-prompt");
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    getListNewestPrompts();
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen hero-container">
      {/* Hero Section */}
      <section className="relative px-4 py-20">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#e1f6ff]/20 to-[#e6b8ff]/20" /> */}
        <div className="z-10 relative mx-auto container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 font-bold text-gray-900 text-4xl md:text-6xl">
              <span className="bg-clip-text bg-gradient-to-r from-[#5700c6] to-[#e6b8ff] text-transparent">
                Thư Viện & Nâng Cấp
              </span>
              <br />
              <span className="bg-clip-text bg-gradient-to-r from-[#5700c6] to-[#e6b8ff] text-transparent">
                Prompt chỉ với 1 nút bấm!
              </span>
            </h1>
            <p className="mb-8 text-gray-600 text-lg md:text-xl">
              Hơn 8,000+ prompts tạo ra từ các chuyên gia về AI
            </p>

            <div className="flex sm:flex-row flex-col justify-center items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#5700c6] hover:from-[#4a00a8] to-[#e6b8ff] hover:to-[#d4a5ff] px-8 py-4 rounded-full text-white text-lg"
                onClick={() => window.open(CHROME_EXTENSION_URL, "_blank")}
              >
                <Download className="mr-2 w-5 h-5" />
                Tải ngay
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="hover:bg-purple-50 px-8 py-4 border-purple-600 rounded-full text-purple-600 text-lg"
                onClick={() => router.push("/thu-vien-prompt")}
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Thư viện prompt
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="px-4 py-8">
        <div className="mx-auto container">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-gray-500 text-sm">Tích hợp với:</div>
            {PARTNERS.map(partner => (
              <div key={partner} className="font-medium text-gray-600 text-sm">
                {partner}
              </div>
            ))}
            <div className="text-gray-500 text-sm">và nhiều hơn nữa!</div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="px-4 py-20">
        <div className="mx-auto container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl md:text-5xl">
              Cách sử dụng thư viện Prompt AI
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-gray-600 text-lg">
              Nâng cao hiệu quả và gia tăng năng suất công việc với hàng nghìn
              Prompt AI chuyên sâu
            </p>
            <Link href="/thu-vien-prompt">
              <Button
                variant="outline"
                className="hover:bg-purple-50 border-purple-600 text-purple-600"
              >
                Xem thêm <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {MARKETPLACE_CARDS.map((card, index) => (
              <Card
                key={card.id}
                className="group relative hover:shadow-xl overflow-hidden transition-all duration-300"
              >
                <div className="z-10 absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="z-20 relative p-6 text-white">
                  <div className="mb-2 font-medium text-sm">
                    Bước {index + 1}
                  </div>
                  <h3 className="mb-2 font-bold text-xl">{card.title}</h3>
                  <p className="opacity-90 text-sm">{card.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-white px-4 py-20">
        <div className="mx-auto container">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl md:text-5xl">
              Giải pháp toàn diện dành riêng cho
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(SOLUTIONS_DATA).map(tag => (
              <Button
                key={tag}
                variant={activeTag === tag ? "default" : "outline"}
                onClick={() =>
                  handleTagChange(tag as keyof typeof SOLUTIONS_DATA)
                }
                className={`${
                  activeTag === tag
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 border-gray-300 hover:bg-purple-50"
                }`}
              >
                {tag}
              </Button>
            ))}
          </div>

          <div className="mb-8 text-center">
            <p className="mx-auto max-w-4xl text-gray-600 text-lg">
              {SOLUTIONS_DATA[activeTag].subtitle}
            </p>
          </div>

          <div className="items-center gap-8 grid grid-cols-1 lg:grid-cols-3">
            <Card className={`p-6 ${animateCards ? "animate-pulse" : ""}`}>
              <Badge className="bg-blue-100 mb-4 text-blue-800">
                {SOLUTIONS_DATA[activeTag].prompts[0].cardLabel}
              </Badge>
              <h3 className="mb-3 font-bold text-xl">
                {SOLUTIONS_DATA[activeTag].prompts[0].title}
              </h3>
              <p className="text-gray-600">
                {SOLUTIONS_DATA[activeTag].prompts[0].subtitle}
              </p>
            </Card>

            <div className="hidden lg:block">
              <Image
                src={SOLUTIONS_DATA[activeTag].imgSrc}
                alt="Solutions"
                width={400}
                height={300}
                className="shadow-lg rounded-lg"
              />
            </div>

            <Card className={`p-6 ${animateCards ? "animate-pulse" : ""}`}>
              <Badge className="bg-green-100 mb-4 text-green-800">
                {SOLUTIONS_DATA[activeTag].prompts[1].cardLabel}
              </Badge>
              <h3 className="mb-3 font-bold text-xl">
                {SOLUTIONS_DATA[activeTag].prompts[1].title}
              </h3>
              <p className="text-gray-600">
                {SOLUTIONS_DATA[activeTag].prompts[1].subtitle}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trending Prompts Section */}
      <section className="px-4 py-20">
        <div className="mx-auto container">
          <h2 className="mb-12 font-bold text-gray-900 text-3xl md:text-4xl text-center">
            Xu hướng Prompts nổi bật
          </h2>

          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
            {newestPrompts.slice(0, 8).map(prompt => (
              <Card
                key={prompt.id}
                className="group hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">ChatGPT</Badge>
                    <Button variant="ghost" size="sm">
                      <Star className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {prompt.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">
                    {prompt.description || prompt.content}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link href="/thu-vien-prompt">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                Tìm hiểu thêm! <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="mx-auto container">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
              Prom Blogs
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600 text-lg">
              Các bài viết cập nhật các tin tức mới nhất liên quan đến Prompts
              và AI.
            </p>
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map(post => (
              <Card
                key={post.id}
                className="group hover:shadow-xl transition-all duration-300"
              >
                <CardHeader>
                  <div className="mb-2 text-gray-500 text-sm">
                    Đã tạo: {timeSince(post.updated_at)}
                  </div>
                  <CardTitle className="text-xl line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4 line-clamp-3">
                    {post.description}
                  </CardDescription>
                  <Link href={`/blog/${post.id}`}>
                    <Button
                      variant="outline"
                      className="group-hover:bg-purple-50 group-hover:border-purple-200 w-full"
                    >
                      Đọc thêm <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-[#e1f6ff] to-[#e6b8ff] px-4 py-20">
        <div className="mx-auto container">
          <div className="mb-12 text-center">
            <div className="mb-2 font-semibold text-purple-600">
              PHẢN HỒI CỦA NGƯỜI DÙNG
            </div>
            <h2 className="font-bold text-gray-900 text-3xl md:text-4xl">
              Họ nói gì về PROM?
            </h2>
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <blockquote className="mb-4 text-gray-700 italic">
                  &quot;{testimonial.text}&quot;
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-gray-200 mr-4 rounded-full w-12 h-12" />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author.name}
                    </div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.author.title}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20">
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
    </div>
  );
}
