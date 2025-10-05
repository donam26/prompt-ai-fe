"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Eye, Heart, Share2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Blog } from "@/types/entities/blog";

interface BlogDetailProps {
  blog: Blog;
}

export const BlogDetail = ({ blog }: BlogDetailProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(blog.like_count || 0);

  const handleLike = async () => {
    try {
      // TODO: Implement like functionality
      setIsLiked(!isLiked);
      setLikeCount(prev => (isLiked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.meta_description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="mx-auto px-4 py-8 max-w-4xl">
      {/* Back Button */}
      <div className="mb-8">
        <Link href="/blog">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Quay lại danh sách
          </Button>
        </Link>
      </div>

      {/* Article Header */}
      <article className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Featured Image */}
        {blog.featured_image && (
          <div className="relative h-64 md:h-96">
            <Image
              src={blog.featured_image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Category and Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {blog.category && (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {blog.category.name}
              </Badge>
            )}
            <div className="flex items-center gap-4 text-gray-600 text-sm">
              {blog.readTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime}</span>
                </div>
              )}
              {blog.view_count && (
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{blog.view_count} lượt xem</span>
                </div>
              )}
              {blog.published_at && (
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.published_at)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-6 font-bold text-gray-900 text-3xl md:text-4xl leading-tight">
            {blog.title}
          </h1>

          {/* Meta Description */}
          {blog.meta_description && (
            <p className="mb-8 text-gray-600 text-xl leading-relaxed">
              {blog.meta_description}
            </p>
          )}

          {/* Author Info */}
          {blog.author && (
            <div className="flex items-center gap-4 bg-gray-50 mb-8 p-4 rounded-lg">
              <div className="flex justify-center items-center bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-12 h-12 font-bold text-white text-lg">
                {blog.author.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  {blog.author.name}
                </p>
                <p className="text-gray-600 text-sm">Tác giả</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div
            className="max-w-none prose-a:text-blue-600 prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose prose-lg"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-8 border-gray-200 border-t">
              <h3 className="mb-4 font-semibold text-gray-900 text-lg">Thẻ</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-sm">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 pt-8 border-gray-200 border-t">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant={isLiked ? "default" : "outline"}
                  onClick={handleLike}
                  className="flex items-center gap-2"
                >
                  <Heart
                    className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span>{likeCount} lượt thích</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Chia sẻ</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <div className="mt-12">
        <h2 className="mb-6 font-bold text-gray-900 text-2xl">
          Bài viết liên quan
        </h2>
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* TODO: Add related articles */}
        </div>
      </div>
    </div>
  );
};
