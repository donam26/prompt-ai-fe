"use client";

export const FeedbackHeader = (): React.JSX.Element => (
  <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4">
    <div className="sm:text-left text-center">
      <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl">
        Quản lý Feedback
      </h1>
      <p className="mt-1 sm:mt-2 text-gray-600">
        Quản lý các phản hồi và góp ý từ người dùng
      </p>
    </div>
  </div>
);
