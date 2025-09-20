"use client";

import { useState } from "react";
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
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AUTH_LABELS, ROUTES_URL } from "@/constants";
import { useLoginQuery } from "@/hooks/auth/useLoginQuery";

export default function LoginPage() {
  const { isLoading: isLoginLoading, mutate: loginUser } = useLoginQuery();
  const [email, setEmail] = useState("");

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email);
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 min-h-screen">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href={ROUTES_URL.HOME}
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
              {AUTH_LABELS.LOGIN.EMAIL_DESCRIPTION}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailLogin} className="space-y-4">
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

              <Button
                type="submit"
                className="w-full"
                disabled={isLoginLoading}
              >
                {isLoginLoading && (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                )}
                Gửi mã OTP
              </Button>
            </form>

            <div className="mt-6 text-center">
              <span className="text-gray-600 text-sm">Chưa có tài khoản? </span>
              <Link
                href={ROUTES_URL.REGISTER}
                className="font-medium text-purple-600 hover:text-purple-700 text-sm"
              >
                Đăng ký ngay
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
