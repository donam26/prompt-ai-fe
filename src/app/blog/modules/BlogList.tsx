"use client";

import { useBlogs } from "@/hooks/admin/useBlog/useBlogs";
import { BlogCard } from "./BlogCard";
import { Pagination } from "@/components/ui/pagination";
import { PaginationParams } from "@/types/base";

interface BlogListProps {
  pagination: PaginationParams;
  onPageChange: (page: number) => void;
}

export const BlogList = ({ pagination, onPageChange }: BlogListProps) => {
  const { blogs, blogsWithPagination, error } = useBlogs({
    pagination,
  });

  const handlePageChange = (page: number) => {
    onPageChange(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) return <div className="py-16 text-center">Lỗi tải dữ liệu</div>;

  return (
    <div className="mx-auto px-4 py-10 max-w-7xl">
      {/* Masonry style */}
      <div className="gap-6 columns-1 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {blogs.map(blog => (
          <div key={blog.id} className="mb-6 break-inside-avoid">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {blogsWithPagination.totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <Pagination
            currentPage={pagination.pageIndex + 1}
            totalPages={blogsWithPagination.totalPages}
            onPageChange={handlePageChange}
            pageSize={pagination.pageSize}
          />
        </div>
      )}
    </div>
  );
};
