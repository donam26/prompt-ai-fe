"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface MasonryCardData {
  id: number;
  type:
    | "group"
    | "testimonial"
    | "profile"
    | "project"
    | "post"
    | "announcement";
  title?: string;
  subtitle?: string;
  author?: string;
  role?: string;
  username?: string;
  time?: string;
  date?: string;
  content?: string | any;
  image?: string;
  stats?: {
    following?: string;
    followers?: string;
    likes?: string;
  };
  achievement?: {
    title: string;
    description: string;
    detail: string;
  };
  engagement?: {
    likes?: string;
    comments?: string;
  };
}

interface MasonryCardProps {
  data: MasonryCardData;
  className?: string;
}

export const MasonryCard: React.FC<MasonryCardProps> = ({
  data,
  className,
}) => {
  const renderGroupCard = () => (
    <div className="bg-white shadow-lg hover:shadow-xl p-6 rounded-xl transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex justify-center items-center bg-blue-100 rounded-lg w-10 h-10">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{data.title}</h3>
          <p className="text-gray-500 text-sm">{data.subtitle}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 pb-2 border-b overflow-x-auto">
        {[
          "Thảo luận",
          "Đáng chú ý",
          "Thành viên",
          "Sự kiện",
          "File phương tiện",
          "File",
        ].map((tab, index) => (
          <button
            key={tab}
            className={cn(
              "flex-shrink-0 px-2 py-1 rounded text-sm whitespace-nowrap",
              index === 0
                ? "bg-blue-100 text-blue-700 font-medium"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Post Content */}
      {data.content && (
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gray-300 rounded-full w-8 h-8"></div>
            <div>
              <p className="font-medium text-gray-900">{data.content.author}</p>
              <p className="text-gray-500 text-xs">{data.content.time}</p>
            </div>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {data.content.post}
          </div>
        </div>
      )}

      {/* Achievement */}
      {data.achievement && (
        <div className="bg-yellow-50 mb-4 p-4 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="flex justify-center items-center bg-yellow-100 rounded-full w-8 h-8">
              <svg
                className="w-5 h-5 text-yellow-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium text-yellow-800">
                {data.achievement.title}
              </p>
              <p className="text-yellow-600 text-sm">
                {data.achievement.description}
              </p>
            </div>
          </div>
          <p className="mt-2 text-gray-600 text-sm">
            {data.achievement.detail}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center text-sm">
        <button className="font-medium text-blue-600 hover:text-blue-700">
          Xem Số liệu phân tích
        </button>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </div>
    </div>
  );

  const renderTestimonialCard = () => (
    <div className="bg-white shadow-lg hover:shadow-xl p-6 rounded-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-12 h-12 font-bold text-white">
          {data.author?.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{data.author}</h3>
          <p className="text-gray-500 text-sm">{data.role}</p>
        </div>
      </div>
      <blockquote className="text-gray-700 italic leading-relaxed">
        {data.content}
      </blockquote>
    </div>
  );

  const renderProfileCard = () => (
    <div className="bg-white shadow-lg hover:shadow-xl p-6 rounded-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex justify-center items-center bg-gradient-to-br from-green-500 to-blue-600 rounded-full w-12 h-12 font-bold text-white">
          {data.author?.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{data.author}</h3>
          <p className="text-gray-500 text-xs">{data.time}</p>
        </div>
      </div>

      {data.username && (
        <div className="bg-gray-50 mb-4 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="bg-gray-300 rounded-full w-10 h-10"></div>
            <div>
              <p className="font-medium text-gray-900">{data.username}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      {data.stats && (
        <div className="gap-4 grid grid-cols-3 mb-4">
          <div className="text-center">
            <p className="font-bold text-gray-900 text-2xl">
              {data.stats.following}
            </p>
            <p className="text-gray-500 text-xs">Đang Follow</p>
          </div>
          <div className="text-center">
            <div className="relative">
              <p className="font-bold text-gray-900 text-2xl">
                {data.stats.followers}
              </p>
              <div className="-top-1 -right-1 absolute bg-red-500 opacity-20 rounded-full w-6 h-4"></div>
            </div>
            <p className="text-gray-500 text-xs">Follower</p>
          </div>
          <div className="text-center">
            <div className="relative">
              <p className="font-bold text-gray-900 text-2xl">
                {data.stats.likes}
              </p>
              <div className="-top-1 -right-1 absolute bg-red-500 opacity-20 rounded-full w-6 h-4"></div>
            </div>
            <p className="text-gray-500 text-xs">Thích</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{data.content}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mb-4">
        <button className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white text-sm transition-colors">
          Sửa hồ sơ
        </button>
        <button className="flex-1 hover:bg-gray-50 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 text-sm transition-colors">
          Chia sẻ hồ sơ
        </button>
      </div>

      {/* Links */}
      <div className="space-y-2 mb-4">
        <a href="#" className="block text-blue-600 hover:text-blue-700 text-sm">
          Đơn hàng của bạn
        </a>
        <a href="#" className="block text-blue-600 hover:text-blue-700 text-sm">
          Nối gót
        </a>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-gray-500 text-sm">
        <div className="flex gap-4">
          <span>Mẹ Chồng Nàng Dâu</span>
          <span>Chuyện Đàn Ông</span>
        </div>
        <button className="bg-blue-100 px-3 py-1 rounded-full font-medium text-blue-700 text-xs">
          Đã ghim
        </button>
      </div>
    </div>
  );

  const renderProjectCard = () => (
    <div className="bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition-shadow">
      <div className="p-6 pb-4">
        <h3 className="mb-4 font-bold text-gray-900 text-lg">{data.title}</h3>
        {data.image && (
          <div className="relative mb-4 rounded-lg h-48 overflow-hidden">
            <Image
              src={data.image}
              alt={data.title || "Project image"}
              fill
              className="object-cover"
            />
          </div>
        )}
        <p className="text-gray-700 leading-relaxed">{data.content}</p>
      </div>
    </div>
  );

  const renderPostCard = () => (
    <div className="bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex justify-center items-center bg-gradient-to-br from-purple-500 to-pink-600 rounded-full w-12 h-12 font-bold text-white">
            {data.author?.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{data.author}</h3>
            <p className="text-gray-500 text-sm">{data.date}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.content}
          </p>
        </div>

        {data.image && (
          <div className="relative mb-4 rounded-lg h-64 overflow-hidden">
            <Image
              src={data.image}
              alt="Post image"
              fill
              className="object-cover"
            />
          </div>
        )}

        {data.engagement && (
          <div className="text-gray-500 text-sm">
            <p className="mb-2">{data.engagement.likes}</p>
            <p>{data.engagement.comments}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAnnouncementCard = () => (
    <div className="bg-white shadow-lg hover:shadow-xl rounded-xl overflow-hidden transition-shadow">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex justify-center items-center bg-gradient-to-br from-orange-500 to-red-600 rounded-full w-12 h-12 font-bold text-white">
            Ă
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{data.author}</h3>
            <p className="text-gray-500 text-sm">{data.role}</p>
            <p className="text-gray-400 text-xs">{data.time}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {data.content}
          </p>
        </div>

        {data.engagement && (
          <div className="pt-4 border-t">
            <p className="mb-3 text-gray-500 text-sm">
              {data.engagement.likes}
            </p>
            <div className="flex gap-4 mb-3">
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="text-sm">Thích</span>
              </button>
              <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span className="text-sm">Bình luận</span>
              </button>
            </div>
            <p className="text-gray-500 text-sm">{data.engagement.comments}</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderCard = () => {
    switch (data.type) {
      case "group":
        return renderGroupCard();
      case "testimonial":
        return renderTestimonialCard();
      case "profile":
        return renderProfileCard();
      case "project":
        return renderProjectCard();
      case "post":
        return renderPostCard();
      case "announcement":
        return renderAnnouncementCard();
      default:
        return null;
    }
  };

  return <div className={cn("masonry-card", className)}>{renderCard()}</div>;
};
