"use client";

import { DEFAULT_PAGINATION } from "@/constants/common";
import { BlogList } from "./modules/BlogList";
import { PaginationParams } from "@/types/base";
import { useState } from "react";

export default function BlogPage() {
  const [pagination, setPagination] = useState<PaginationParams>({
    ...DEFAULT_PAGINATION,
    pageIndex: 0,
    pageSize: 9,
  });
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, pageIndex: page - 1 }));
  };

  return (
    <div className="bg-white py-8 min-h-screen">
      <div className="mx-auto px-4 max-w-7xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-bold text-gray-900 text-4xl">
            Bài Viết Blog & Tài Nguyên
          </h1>
          <p className="mx-auto max-w-3xl text-gray-600 text-lg">
            Đọc thêm các bài viết và cập nhật mới nhất về prompt, AI và các công
            cụ hỗ trợ công việc của bạn
          </p>
        </div>

        <BlogList pagination={pagination} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}
