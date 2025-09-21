import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { VerifyOTPContent } from "./components";

/**
 * Verify OTP Page Component
 */
export default function VerifyOTPPage(): React.JSX.Element {
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
