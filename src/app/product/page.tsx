"use client";

import { useState } from "react";
import { ProductCard } from "@/components/user/ProductCard";
import { Pagination } from "@/components/ui/pagination";
import { useProducts } from "@/hooks/admin/useProduct/useProducts";
import { DEFAULT_PAGINATION } from "@/constants/common";
import { PaginationParams } from "@/types/base";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const router = useRouter();
  const [pagination, setPagination] =
    useState<PaginationParams>(DEFAULT_PAGINATION);

  const { productsWithPagination } = useProducts({
    pagination,
  });

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, pageIndex: page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleUpgradeClick = () => {
    router.push("/pricing");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-bold text-gray-900 text-2xl sm:text-3xl lg:text-4xl">
            Kho Tài Liệu AI
          </h1>
          <p className="mx-auto px-4 max-w-3xl text-gray-600 text-sm sm:text-base lg:text-lg">
            Nhấp vào Truy cập trong Notion bên dưới để truy cập các sản phẩm về
            AI được tổng hợp bởi chúng tôi
          </p>
        </div>

        {/* Products Grid */}
        <div className="gap-4 sm:gap-6 grid grid-cols-1 lg:grid-cols-2 mb-8">
          {productsWithPagination.data.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onUpgradeClick={handleUpgradeClick}
              onLoginClick={handleLoginClick}
            />
          ))}
        </div>

        {/* Pagination */}
        {productsWithPagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.pageIndex}
            totalPages={productsWithPagination.totalPages}
            pageSize={pagination.pageSize}
            onPageChange={handlePageChange}
            showSizeChanger={false}
            size="small"
            responsive={true}
          />
        )}
      </div>
    </div>
  );
};

export default ProductPage;
