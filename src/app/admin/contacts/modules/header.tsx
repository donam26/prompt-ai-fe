"use client";

export const ContactHeader = (): React.JSX.Element => (
  <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-4">
    <div className="sm:text-left text-center">
      <h1 className="font-bold text-gray-900 text-2xl sm:text-3xl">
        Quản lý Liên hệ
      </h1>
      <p className="mt-1 sm:mt-2 text-gray-600">
        Quản lý các tin nhắn liên hệ từ khách hàng
      </p>
    </div>
  </div>
);
