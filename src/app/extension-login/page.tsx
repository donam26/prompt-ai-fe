"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { sendTokenToExtension, sendClosePopup } from "@/utils/extensionHelper";
import { useAuth } from "@/hooks/useAuth";
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
import { Loader2, Mail } from "lucide-react";
import { AUTH_LABELS } from "@/constants";
import { useLoginQuery } from "@/hooks/auth/useLoginQuery";
import { useExtensionOTPQuery } from "@/hooks/auth/useExtensionOTPQuery";

function ExtensionLoginContent() {
  const { user, token, isLoading: isAuthLoading, isLoggedIn } = useAuth();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const { isLoading: isLoginLoading, mutate: loginUser } = useLoginQuery();
  const { isLoading: isOtpLoading, mutate: verifyOtp } = useExtensionOTPQuery();

  // Check if this is an extension popup
  const isExtensionPopup =
    searchParams.get("from") === "extension" &&
    searchParams.get("source") === "popup";

  // Handle successful login and send message to extension
  const handleLoginSuccess = useCallback(
    (userData: any, authToken: string) => {
      if (!isExtensionPopup || isProcessing) {
        return;
      }

      setIsProcessing(true);

      if (authToken) {
        // Send TOKEN_FROM_WEB message to extension
        sendTokenToExtension(authToken, userData);

        setTimeout(() => {
          sendClosePopup("Login successful", userData.id);
          window.close();
        }, 2000);
      } else {
        setTimeout(() => {
          window.close();
        }, 2000);
      }
    },
    [isExtensionPopup, isProcessing]
  );

  // Handle email login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isExtensionPopup) {
      try {
        const success = await loginUser(email);
        if (success) {
          setOtpSent(true);
        }
      } catch (error) {
        console.error("Error sending OTP:", error);
      }
    } else {
      loginUser(email);
    }
  };

  // Handle OTP verification
  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isExtensionPopup) {
      try {
        const success = await verifyOtp(email, otp);

        if (success) {
          // Wait a bit for auth store to be updated, then check for token
          setTimeout(() => {
            const authToken = token || localStorage.getItem("authToken");

            if (authToken && user) {
              const userData = {
                id: String(user.id || "unknown"),
                name: user.fullName || "User",
                email: user.email || email,
                picture: user.profileImage || "",
              };

              handleLoginSuccess(userData, authToken);
            } else {
              // Retry after another delay
              setTimeout(() => {
                const retryToken = token || localStorage.getItem("authToken");

                if (retryToken && user) {
                  const userData = {
                    id: String(user.id || "unknown"),
                    name: user.fullName || "User",
                    email: user.email || email,
                    picture: user.profileImage || "",
                  };

                  handleLoginSuccess(userData, retryToken);
                }
              }, 1000);
            }
          }, 500);
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
      }
    }
  };

  // Unified effect to handle both existing auth and new login
  useEffect(() => {
    // Only process if this is an extension popup and we have a user
    if (isExtensionPopup && user && !isProcessing) {
      // Get user data from auth store
      const userData = {
        id: String(user.id || "unknown"),
        name: user.fullName || "User",
        email: user.email || "",
        picture: user.profileImage || "",
      };

      // Get token from auth store or localStorage
      const authToken = token || localStorage.getItem("authToken");

      if (authToken) {
        handleLoginSuccess(userData, authToken);
      } else {
        setTimeout(() => {
          sendClosePopup("No token found", userData.id);
          window.close();
        }, 2000);
      }
    }
  }, [isExtensionPopup, user, isProcessing, handleLoginSuccess, token]);

  // Monitor for auth changes (especially after OTP verification)
  useEffect(() => {
    if (isExtensionPopup && user && !isProcessing) {
      // Add a small delay to ensure token is saved to localStorage
      const timeoutId = setTimeout(() => {
        const authToken = token || localStorage.getItem("authToken");

        if (authToken) {
          const userData = {
            id: String(user.id || "unknown"),
            name: user.fullName || "User",
            email: user.email || "",
            picture: user.profileImage || "",
          };

          handleLoginSuccess(userData, authToken);
        }
      }, 1000); // Wait 1 second for token to be saved

      return () => clearTimeout(timeoutId);
    }
  }, [isExtensionPopup, user, isProcessing, handleLoginSuccess, token]);

  if (!isExtensionPopup) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-gray-900 text-2xl">
            Extension Login
          </h1>
          <p className="text-gray-600">
            This page is only accessible from browser extension.
          </p>
        </div>
      </div>
    );
  }

  // Show processing state after successful login
  if (isProcessing) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="mx-auto mb-4 border-blue-600 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
          <h1 className="mb-2 font-semibold text-gray-900 text-xl">
            Đang xử lý đăng nhập...
          </h1>
          <p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
        </div>
      </div>
    );
  }

  // Show login form if not logged in or if auth is loading
  if (isAuthLoading || !isLoggedIn) {
    return (
      <div className="flex justify-center items-center bg-white p-4 min-h-screen">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="font-bold text-gray-900 text-3xl">
              {otpSent ? "Xác thực OTP" : AUTH_LABELS.LOGIN.TITLE}
            </h1>
            <p className="mt-2 text-gray-600">
              {otpSent
                ? "Nhập mã OTP đã được gửi đến email của bạn"
                : AUTH_LABELS.LOGIN.SUBTITLE}
            </p>
            <p className="mt-1 text-blue-600 text-sm">
              Đăng nhập để sử dụng extension
            </p>
          </div>

          <Card>
            <CardHeader className="space-y-0 px-6">
              <CardTitle>
                {otpSent ? "Nhập mã OTP" : AUTH_LABELS.LOGIN.FORM_TITLE}
              </CardTitle>
              <CardDescription>
                {otpSent
                  ? `Mã OTP đã được gửi đến ${email}`
                  : AUTH_LABELS.LOGIN.EMAIL_DESCRIPTION}
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6">
              {!otpSent ? (
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
              ) : (
                // OTP form
                <form onSubmit={handleOtpVerification} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp">Mã OTP</Label>
                    <div className="relative">
                      <Mail className="top-3 left-3 absolute w-4 h-4 text-gray-400" />
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Nhập mã OTP"
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
                    disabled={isOtpLoading}
                  >
                    {isOtpLoading && (
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    )}
                    Xác thực OTP
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => setOtpSent(false)}
                  >
                    Quay lại
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // This should not be reached due to the logic above, but keeping as fallback
  return null;
}

export default function ExtensionLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-center">
            <Loader2 className="mx-auto mb-4 w-8 h-8 animate-spin" />
            <p>Loading...</p>
          </div>
        </div>
      }
    >
      <ExtensionLoginContent />
    </Suspense>
  );
}
