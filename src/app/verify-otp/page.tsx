"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useResendOTPQuery } from "@/hooks/auth/useResendOTPQuery";
import { useVerifyOTPQuery } from "@/hooks/auth/useVerifyOTPQuery";
import { ROUTES_URL } from "@/constants";

function VerifyOTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoading: isResendLoading, mutate: resendOTP } = useResendOTPQuery();
  const { isLoading: isVerifyLoading, mutate: verifyOTP } = useVerifyOTPQuery();

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    } else {
      // Redirect to login if no email provided
      router.push(ROUTES_URL.LOGIN);
    }
  }, [searchParams, router]);

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    verifyOTP(email, otp);
  };

  if (!email) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4 min-h-screen">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link
            href={ROUTES_URL.LOGIN}
            className="inline-flex items-center mb-4 text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Quay lại đăng nhập
          </Link>
          <h1 className="font-bold text-gray-900 text-3xl">
            Xác thực tài khoản
          </h1>
          <p className="mt-2 text-gray-600">
            Nhập mã OTP đã được gửi đến email của bạn
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Nhập mã OTP</CardTitle>
            <CardDescription>
              Mã OTP đã được gửi đến <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Mã OTP</Label>
                <div className="relative">
                  <Mail className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Nhập mã OTP 6 số"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    className="pl-10"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isVerifyLoading}
              >
                {isVerifyLoading && (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                )}
                Xác thực
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => resendOTP(email)}
                disabled={isResendLoading}
                className="w-full"
              >
                {isResendLoading && (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                )}
                Gửi lại mã OTP
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <VerifyOTPContent />
    </Suspense>
  );
}
