"use client";

import toast, { Toaster } from "react-hot-toast";

export const SimpleToast = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
      }}
    />
  );
};

export const showSimpleToast = (message: string) => {
  toast.success(message);
};
