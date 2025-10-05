import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTimeAgo } from "@/utils";

export const BlogCard = ({ blog }: { blog: any }) => {
  return (
    <Link
      href={`/blog/${blog.id}`}
      className="group relative flex flex-col bg-[#F4F0FF] shadow-md hover:shadow-xl rounded-3xl transition-all hover:-translate-y-1 duration-300"
    >
      {/* Image */}
      {blog.featuredImage && (
        <div className="relative rounded-t-3xl w-full aspect-[16/9] overflow-hidden">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col justify-between gap-3 p-5 sm:p-6">
        <div>
          <div className="flex justify-between items-center mb-1 text-gray-500 text-xs">
            <span>{getTimeAgo(blog.updatedAt)}</span>
            {blog.category?.name && (
              <span className="bg-purple-50 px-2 py-0.5 rounded-full font-medium text-[11px] text-purple-600">
                {blog.category.name}
              </span>
            )}
          </div>

          <h3 className="mb-2 font-semibold text-gray-900 text-base">
            {blog.title}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-gray-600 text-sm line-clamp-2">
              {blog.metaDescription}
            </p>
            <div className="flex justify-end items-center mt-3">
              <div className="flex justify-center items-center bg-purple-600 group-hover:bg-purple-700 rounded-full w-8 h-8 text-white transition-all duration-300">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
