"use client";

import { useParams } from "next/navigation";

import { Loading, AdminPageLayout, AdminContentCard } from "@/components/admin";
import { LOADING_TYPE } from "@/constants/loading";
import { BlogForm, BlogFormActions, useBlogForm } from "./modules";

export default function BlogEditPage(): React.JSX.Element {
  const params = useParams();
  const blogId = params?.id as string;

  // Form hook with all state management
  const {
    formData,
    errors,
    isLoading,
    error,
    handleFieldChange,
    handleSubmit,
    handleReset,
  } = useBlogForm(blogId);

  // Loading state
  if (isLoading) {
    return (
      <AdminPageLayout
        title="Đang tải..."
        description="Đang tải thông tin bài viết..."
      >
        <AdminContentCard>
          <Loading
            type={LOADING_TYPE.PAGE}
            text="Đang tải thông tin bài viết..."
          />
        </AdminContentCard>
      </AdminPageLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <AdminPageLayout title="Lỗi" description="Không tìm thấy bài viết">
        <AdminContentCard>
          <div className="flex flex-col justify-center items-center py-12 text-center">
            <div className="flex justify-center items-center bg-red-100 mb-4 rounded-full w-16 h-16">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="mb-2 font-semibold text-gray-900 text-lg">
              Không tìm thấy bài viết
            </h3>
            <p className="mb-6 text-gray-600">
              Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
          </div>
        </AdminContentCard>
      </AdminPageLayout>
    );
  }

  return (
    <AdminPageLayout
      title={blogId ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
      description={
        blogId
          ? "Cập nhật thông tin bài viết và đảm bảo nội dung chính xác và phù hợp."
          : "Tạo bài viết mới với nội dung chất lượng và thông tin đầy đủ."
      }
      actions={
        <BlogFormActions onReset={handleReset} onSubmit={handleSubmit} />
      }
    >
      <AdminContentCard>
        <BlogForm
          formData={formData}
          errors={errors}
          isLoading={isLoading}
          onFieldChange={handleFieldChange}
          onSubmit={handleSubmit}
        />
      </AdminContentCard>
    </AdminPageLayout>
  );
}
