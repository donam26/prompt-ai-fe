"use client";

import { useState, useEffect } from "react";
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
import { OTP_CONFIG, VERIFY_OTP_TEXT, VERIFY_OTP_CLASSES } from "../constants";

/**
 * VerifyOTPContent component for OTP verification
 */
export function VerifyOTPContent(): React.JSX.Element {
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

  const handleVerifyOTP = (e: React.FormEvent): void => {
    e.preventDefault();
    verifyOTP(email, otp);
  };

  const handleResendOTP = (): void => {
    resendOTP(email);
  };

  if (!email) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className={VERIFY_OTP_CLASSES.CONTAINER}>
      <div className={VERIFY_OTP_CLASSES.CARD_CONTAINER}>
        {/* Header Section */}
        <div className={VERIFY_OTP_CLASSES.HEADER_SECTION}>
          <Link
            href={ROUTES_URL.LOGIN}
            className={VERIFY_OTP_CLASSES.BACK_LINK}
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            {VERIFY_OTP_TEXT.BACK_TO_LOGIN}
          </Link>
          <h1 className="font-bold text-gray-900 text-3xl">
            {VERIFY_OTP_TEXT.TITLE}
          </h1>
          <p className="mt-2 text-gray-600">{VERIFY_OTP_TEXT.SUBTITLE}</p>
        </div>

        {/* OTP Form Card */}
        <Card className="px-6">
          <CardHeader>
            <CardTitle>{VERIFY_OTP_TEXT.FORM_TITLE}</CardTitle>
            <CardDescription>
              Mã OTP đã được gửi đến <strong>{email}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={handleVerifyOTP}
              className={VERIFY_OTP_CLASSES.FORM_SPACING}
            >
              {/* OTP Input */}
              <div className={VERIFY_OTP_CLASSES.INPUT_SPACING}>
                <Label htmlFor="otp">{VERIFY_OTP_TEXT.OTP_LABEL}</Label>
                <div className="relative">
                  <Mail className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder={OTP_CONFIG.PLACEHOLDER}
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    className="pl-10"
                    maxLength={OTP_CONFIG.MAX_LENGTH}
                    required
                  />
                </div>
              </div>

              {/* Verify Button */}
              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={isVerifyLoading}
              >
                {isVerifyLoading && (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                )}
                {VERIFY_OTP_TEXT.VERIFY_BUTTON}
              </Button>
            </form>

            {/* Resend OTP Button */}
            <div className={VERIFY_OTP_CLASSES.RESEND_SECTION}>
              <Button
                type="button"
                variant="outline"
                onClick={handleResendOTP}
                disabled={isResendLoading}
                className="w-full"
              >
                {isResendLoading && (
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                )}
                {VERIFY_OTP_TEXT.RESEND_BUTTON}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
