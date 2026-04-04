"use client";

import { useState, Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCheckoutData } from "@/hooks/useCheckoutData";
import { usePricingSubscriptions } from "@/hooks/usePricingSubscriptions";
import { useDiscount } from "@/hooks/useDiscount";
import { paymentApi } from "@/services/api";
import { showToast } from "@/components/ui/toast";
import { ArrowLeft, CreditCard, Shield, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES_URL } from "@/constants/routes-url";

function CheckoutContentInner() {
  const router = useRouter();
  const { checkoutData, isLoading, error } = useCheckoutData();
  const { subscriptions } = usePricingSubscriptions();
  const { applyDiscount, isApplying, error: discountError } = useDiscount();
  const [isProcessing, setIsProcessing] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState<number | null>(null);
  const [discountErrorMessage, setDiscountErrorMessage] = useState<
    string | null
  >(null);

  const handleBackToPricing = () => {
    router.push("/pricing");
  };

  const handleSkoolPayment = () => {
    router.push(ROUTES_URL.PRICING);
  };

  const handleApplyDiscount = async () => {
    if (!discountCode || !checkoutData) return;

    // Clear previous error messages
    setDiscountErrorMessage(null);

    const response = await applyDiscount({
      code: discountCode,
      total: checkoutData.planPrice,
    });

    if (response.success) {
      const discountAmount = response.data?.discountAmount || 0;
      const newPrice = checkoutData.planPrice - discountAmount;
      setDiscountedPrice(newPrice);
      setDiscountErrorMessage(null); // Clear any previous errors
      showToast.success("Áp dụng mã giảm giá thành công!");
    }
  };

  const getFinalPrice = () => {
    if (!checkoutData) return 0;
    return discountedPrice !== null ? discountedPrice : checkoutData.planPrice;
  };

  const handleProceedToPayment = async () => {
    if (!checkoutData) return;

    setIsProcessing(true);
    try {
      // Find the subscription plan from API data
      const plan = subscriptions.find(
        p => p.id?.toString() === checkoutData.planId
      );

      if (!plan) {
        showToast.error("Không tìm thấy thông tin gói đăng ký");
        return;
      }

      // Prepare payment data similar to the old project
      const userLocal = JSON.parse(localStorage.getItem("user") || "{}");
      const info = `${userLocal.id || "guest"}-${checkoutData.planId}`;

      const paymentData = {
        amount: getFinalPrice(),
        orderInfo: info,
        duration: 1, // Default to monthly, can be made dynamic
        orderType: "goi", // Subscription type
        language: "vn",
        bankCode: "",
      };

      // Call actual payment API
      const response = await paymentApi.createPaymentUrl(paymentData);

      if (response.success && response.data?.paymentUrl) {
        // Redirect to VNPay payment page
        window.location.href = response.data.paymentUrl;
      } else {
        showToast.error(
          response.message || "Có lỗi xảy ra khi tạo link thanh toán"
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      showToast.error("Có lỗi xảy ra khi xử lý thanh toán");
    } finally {
      setIsProcessing(false);
    }
  };

  const formatPrice = (price: number): string => {
    if (price === 0) return "0đ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    if (discountError) {
      setDiscountErrorMessage(discountError);
    }
  }, [discountError]);

  if (isLoading) {
    return (
      <div className="mx-auto px-4 py-8 container">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="mx-auto mb-4 border-purple-600 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
            <p className="text-gray-600">Đang tải thông tin thanh toán...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !checkoutData) {
    return (
      <div className="mx-auto px-4 py-8 container">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="mx-auto mb-4 text-red-500 text-4xl">⚠️</div>
            <h2 className="mb-4 font-semibold text-gray-900 text-xl">
              Lỗi tải thông tin thanh toán
            </h2>
            <p className="mb-6 text-gray-600">
              {error || "Không thể tải thông tin thanh toán. Vui lòng thử lại."}
            </p>
            <Button onClick={handleBackToPricing} variant="outline">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Quay lại trang giá
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-8 min-h-screen">
      <div className="mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={handleBackToPricing}
            variant="ghost"
            className="mb-4 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Quay lại trang giá
          </Button>

          <div className="text-center">
            <h1 className="mb-2 font-bold text-gray-900 text-4xl">
              Thanh toán
            </h1>
            <p className="text-gray-600 text-lg">
              Hoàn tất thanh toán để nâng cấp tài khoản của bạn
            </p>
          </div>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
          {/* Order Summary */}
          <div className="space-y-6">
            {/* Plan Details */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="mb-2 font-bold text-gray-900 text-2xl">
                      {checkoutData.planName}
                    </h3>
                    <Badge
                      variant={
                        checkoutData.planType === 1 ? "secondary" : "default"
                      }
                      className="text-sm"
                    >
                      {checkoutData.planType === 1 ? "Miễn phí" : "Premium"}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 text-3xl">
                      {formatPrice(checkoutData.planPrice)}
                    </p>
                    {checkoutData.planPrice > 0 && (
                      <p className="text-gray-500 text-sm">/tháng</p>
                    )}
                  </div>
                </div>

                {/* Features */}
                {checkoutData.features.length > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="mb-3 font-semibold text-gray-900">
                      Bao gồm:
                    </h4>
                    <ul className="space-y-2">
                      {checkoutData.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Discount Code */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h4 className="mb-4 font-semibold text-gray-900 text-lg">
                  Mã giảm giá
                </h4>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={e => {
                      setDiscountCode(e.target.value);
                      // Clear error when user starts typing
                      setDiscountErrorMessage(null);
                    }}
                    placeholder="Nhập mã giảm giá"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                  />
                  <Button
                    onClick={handleApplyDiscount}
                    variant="outline"
                    disabled={!discountCode || isApplying}
                    className="px-6 py-3 font-semibold"
                  >
                    {isApplying ? "Đang xử lý..." : "Áp dụng"}
                  </Button>
                </div>
                {discountedPrice !== null && (
                  <p className="mt-3 font-medium text-green-600">
                    ✅ Đã áp dụng mã giảm giá! Tiết kiệm{" "}
                    {formatPrice(checkoutData.planPrice - discountedPrice)}
                  </p>
                )}
                {discountErrorMessage && (
                  <div className="bg-red-50 mt-3 p-3 border border-red-200 rounded-lg">
                    <p className="font-medium text-red-600 text-sm">
                      ❌ {discountErrorMessage}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h4 className="mb-4 font-semibold text-gray-900 text-lg">
                  Phương thức thanh toán
                </h4>

                {/* VNPay Payment Method */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex justify-center items-center bg-blue-600 rounded-xl w-12 h-12">
                    <span className="font-bold text-white text-lg">V</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">VNPay</p>
                    <p className="text-gray-600">
                      Thanh toán nhanh chóng và an toàn
                    </p>
                  </div>
                </div>

                {/* Skool Payment Method - Only show when subscription.id == 12 */}
                {checkoutData.planId === "12" && (
                  <>
                    <div className="my-4 border-gray-200 border-t"></div>
                    <div
                      className="flex items-center gap-4 hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200 cursor-pointer"
                      onClick={handleSkoolPayment}
                      role="button"
                      tabIndex={0}
                      onKeyDown={e => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSkoolPayment();
                        }
                      }}
                      aria-label="Thanh toán qua Skool Community"
                    >
                      <div className="flex justify-center items-center bg-green-600 rounded-xl w-12 h-12">
                        <span className="font-bold text-white text-lg">S</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">
                          Skool
                        </p>
                        <p className="text-gray-600">
                          Thanh toán qua Skool Community
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card className="top-8 sticky shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="px-6 font-bold text-xl">
                  Tổng kết đơn hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Plan Price */}
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium text-gray-600">
                    {checkoutData.planName}
                  </span>
                  <span className="font-semibold text-lg">
                    {formatPrice(checkoutData.planPrice)}
                  </span>
                </div>

                {/* Discount */}
                {discountedPrice !== null && (
                  <div className="flex justify-between items-center py-2 text-green-600">
                    <span className="font-medium">Giảm giá</span>
                    <span className="font-semibold">
                      -{formatPrice(checkoutData.planPrice - discountedPrice)}
                    </span>
                  </div>
                )}

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center py-3">
                  <span className="font-bold text-xl">Tổng cộng</span>
                  <span className="font-bold text-purple-600 text-2xl">
                    {formatPrice(getFinalPrice())}
                  </span>
                </div>

                {/* Security Notice */}
                <div className="bg-green-50 p-4 border border-green-200 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">
                      Thanh toán an toàn
                    </span>
                  </div>
                  <p className="text-green-700 text-sm">
                    Thông tin thanh toán của bạn được bảo mật bằng mã hóa SSL
                  </p>
                </div>

                {/* Payment Button */}
                <Button
                  onClick={handleProceedToPayment}
                  disabled={isProcessing || getFinalPrice() === 0}
                  className={cn(
                    "py-4 rounded-xl w-full font-bold text-lg",
                    getFinalPrice() === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700 shadow-lg"
                  )}
                >
                  {isProcessing ? (
                    <>
                      <div className="mr-2 border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin"></div>
                      Đang xử lý...
                    </>
                  ) : getFinalPrice() === 0 ? (
                    "Gói miễn phí"
                  ) : (
                    <>
                      <CreditCard className="mr-2 w-5 h-5" />
                      Thanh toán VNPay
                    </>
                  )}
                </Button>

                <p className="text-gray-500 text-sm text-center leading-relaxed">
                  Bằng cách thanh toán, bạn đồng ý với{" "}
                  <a
                    href="/terms"
                    className="font-medium text-purple-600 hover:underline"
                  >
                    Điều khoản sử dụng
                  </a>{" "}
                  và{" "}
                  <a
                    href="/privacy"
                    className="font-medium text-purple-600 hover:underline"
                  >
                    Chính sách bảo mật
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutContent() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center bg-gray-50 min-h-screen">
          <div className="text-center">
            <div className="mx-auto mb-4 border-purple-600 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
            <p className="text-gray-600">Đang tải trang thanh toán...</p>
          </div>
        </div>
      }
    >
      <CheckoutContentInner />
    </Suspense>
  );
}

export default function CheckoutPage() {
  return <Card />;
  return <CheckoutContent />;
}
