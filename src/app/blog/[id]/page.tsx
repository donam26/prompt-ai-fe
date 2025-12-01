"use client";

import { useParams, useRouter } from "next/navigation";
import { useBlogDetail } from "@/hooks/admin/useBlog/useBlogDetail";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogDetail } from "./modules/BlogDetail";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { ROUTES_URL } from "@/constants/routes-url";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params.id as string;

  // Check if user is logged in, redirect to login if not
  const { isLoading: isAuthLoading } = useAuthRedirect({
    redirectTo: ROUTES_URL.LOGIN,
    requireAuth: true,
    showWarning: true,
    warningMessage: "Bạn cần đăng nhập để xem bài viết này",
  });

  const { blog, isLoading, error } = useBlogDetail(blogId);

  const handleBack = () => {
    router.back();
  };

  // Loading state - check auth first
  if (isAuthLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
          <p className="text-gray-600">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-4 mx-auto p-6 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500" />
          <h2 className="font-bold text-gray-900 text-2xl">
            Không tìm thấy bài viết
          </h2>
          <p className="text-gray-600">
            {error || "Bài viết không tồn tại hoặc đã bị xóa"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Back Button */}
      <div className="border-gray-200 border-b">
        <div className="mx-auto px-4 py-6 max-w-7xl">
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mb-4 p-0 h-auto text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Quay lại
          </Button>
        </div>
      </div>

      {/* Blog Detail Component */}
      <BlogDetail blog={blog} />
    </div>
  );
}
