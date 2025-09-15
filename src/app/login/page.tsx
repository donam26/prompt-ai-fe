"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { userService } from "@/services";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { AUTH_MESSAGES, AUTH_LABELS, AUTH_FIELD_NAMES } from "@/constants";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordLogin, setIsPasswordLogin] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await userService.loginUser(email);
      if (response.data.success) {
        toast.success(AUTH_MESSAGES.LOGIN.OTP_SENT);
        // Redirect to OTP verification page
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      }
    } catch (error: any) {
      setError(
        error?.response?.data?.message || AUTH_MESSAGES.LOGIN.GENERIC_ERROR
      );
      toast.error(AUTH_MESSAGES.LOGIN.FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const userIP = await fetch("https://api.ipify.org?format=json")
        .then(res => res.json())
        .then(data => data.ip)
        .catch(() => "127.0.0.1");

      const response = await userService.passwordLogin({
        email,
        password,
        userIP,
      });
      if (response.data.success) {
        const { user, token } = response.data.data;
        login(user, token);
        toast.success(AUTH_MESSAGES.LOGIN.SUCCESS);
        router.push("/thu-vien-prompt");
      }
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
          AUTH_MESSAGES.LOGIN.INVALID_CREDENTIALS
      );
      toast.error(AUTH_MESSAGES.LOGIN.FAILED);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 min-h-screen">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center mb-4 text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            {AUTH_LABELS.LOGIN.BACK_HOME}
          </Link>
          <h1 className="font-bold text-gray-900 text-3xl">
            {AUTH_LABELS.LOGIN.TITLE}
          </h1>
          <p className="mt-2 text-gray-600">{AUTH_LABELS.LOGIN.SUBTITLE}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{AUTH_LABELS.LOGIN.FORM_TITLE}</CardTitle>
            <CardDescription>
              {isPasswordLogin
                ? AUTH_LABELS.LOGIN.PASSWORD_DESCRIPTION
                : AUTH_LABELS.LOGIN.EMAIL_DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={
                isPasswordLogin ? handlePasswordLogin : handleEmailLogin
              }
              className="space-y-4"
            >
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {isPasswordLogin && (
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <div className="relative">
                    <Lock className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Nhập mật khẩu của bạn"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                {isPasswordLogin ? "Đăng nhập" : "Gửi mã OTP"}
              </Button>
            </form>

            <div className="space-y-4 mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="border-gray-300 border-t w-full" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Hoặc</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setIsPasswordLogin(!isPasswordLogin)}
              >
                {isPasswordLogin
                  ? "Đăng nhập bằng OTP"
                  : "Đăng nhập bằng mật khẩu"}
              </Button>

              <div className="text-center">
                <Link
                  href="/forgot-password"
                  className="text-purple-600 hover:text-purple-700 text-sm"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              <div className="text-center">
                <span className="text-gray-600 text-sm">
                  Chưa có tài khoản?{" "}
                </span>
                <Link
                  href="/register"
                  className="font-medium text-purple-600 hover:text-purple-700 text-sm"
                >
                  Đăng ký ngay
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
