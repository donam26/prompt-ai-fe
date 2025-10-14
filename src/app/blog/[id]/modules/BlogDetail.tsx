"use client";

import { useState } from "react";
import { Calendar, Clock, Eye, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { showToast } from "@/components/ui/toast";
import type { Blog } from "@/types/entities/blog";

interface BlogDetailProps {
  blog: Blog;
  onLike?: () => Promise<{ liked: boolean; likeCount: number } | null>;
  onShare?: () => void;
}

export const BlogDetail = ({ blog, onLike, onShare }: BlogDetailProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking || !onLike) return;

    setIsLiking(true);
    try {
      const result = await onLike();
      if (result) {
        setIsLiked(result.liked);
        showToast.success(
          result.liked ? "Đã thích bài viết!" : "Đã bỏ thích bài viết!"
        );
      }
    } catch {
      showToast.error("Có lỗi xảy ra khi thích bài viết");
    } finally {
      setIsLiking(false);
    }
  };

  const handleShare = async () => {
    if (onShare) {
      onShare();
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.metaDescription,
          url: window.location.href,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast.success("Đã sao chép link bài viết!");
      } catch {
        showToast.error("Không thể sao chép link");
      }
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="border-gray-200 border-b">
        <div className="mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center gap-4 mb-4 text-gray-500 text-sm">
            {blog.category && (
              <span className="bg-purple-100 px-2 py-1 rounded-full font-medium text-purple-800 text-xs">
                {blog.category.name}
              </span>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(
                  blog.publishedAt || blog.createdAt
                ).toLocaleDateString("vi-VN")}
              </span>
            </div>
            {blog.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{blog.viewCount || 0} lượt xem</span>
            </div>
          </div>

          <h1 className="mb-4 font-bold text-gray-900 text-3xl md:text-4xl">
            {blog.title}
          </h1>

          {blog.metaDescription && (
            <p className="mb-6 text-gray-600 text-lg">{blog.metaDescription}</p>
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {blog.author && (
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-gray-200 rounded-full w-10 h-10">
                    {blog.author.avatar ? (
                      <Image
                        src={blog.author.avatar}
                        alt={blog.author.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    ) : (
                      <span className="font-medium text-gray-600">
                        {blog.author.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {blog.author.name}
                    </p>
                    <p className="text-gray-500 text-sm">Tác giả</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleLike}
                disabled={isLiking}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Heart
                  className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                />
                <span>{blog.likeCount || 0}</span>
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Chia sẻ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {blog.featuredImage && (
        <div className="mx-auto px-4 py-8 max-w-7xl">
          <div className="relative rounded-xl w-full h-64 md:h-96 overflow-hidden">
            <Image
              src={blog.featuredImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto px-4 py-8 max-w-7xl">
        <div className="max-w-none prose prose-lg">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
            components={{
              h1: ({ children }) => (
                <h1 className="mt-8 first:mt-0 mb-6 font-bold text-gray-900 text-3xl">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="mt-6 mb-4 font-bold text-gray-900 text-2xl">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-5 mb-3 font-bold text-gray-900 text-xl">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="space-y-2 mb-4 text-gray-700 list-disc list-inside">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="space-y-2 mb-4 text-gray-700 list-decimal list-inside">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-700">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-6 pl-4 border-purple-500 border-l-4 text-gray-600 italic">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                return isInline ? (
                  <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-purple-600 text-sm">
                    {children}
                  </code>
                ) : (
                  <code className={className}>{children}</code>
                );
              },
              pre: ({ children }) => (
                <pre className="bg-gray-900 mb-4 p-4 rounded-lg overflow-x-auto text-gray-100">
                  {children}
                </pre>
              ),
              img: ({ src, alt }) => (
                <Image
                  src={typeof src === "string" ? src : ""}
                  alt={alt || ""}
                  width={800}
                  height={400}
                  className="shadow-md my-6 rounded-lg max-w-full h-auto"
                />
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800 underline"
                >
                  {children}
                </a>
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="mt-8 pt-6 border-gray-200 border-t">
            <h3 className="mb-3 font-semibold text-gray-900 text-lg">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
