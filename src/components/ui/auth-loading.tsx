import { Loader2 } from "lucide-react";

interface AuthLoadingProps {
  message?: string;
}

export const AuthLoading = ({
  message = "Đang kiểm tra trạng thái đăng nhập...",
}: AuthLoadingProps) => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};
