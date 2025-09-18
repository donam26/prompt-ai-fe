"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { LAYOUT_LABELS } from "@/constants/layout";

/**
 * Props for the FooterNewsletter component
 */
interface FooterNewsletterProps {
  readonly className?: string;
}

/**
 * Newsletter subscription component for footer
 *
 * @param props - The component props
 * @returns The newsletter component JSX
 */
export function FooterNewsletter({
  className,
}: FooterNewsletterProps): React.JSX.Element {
  const [email, setEmail] = useState("");

  const handleSubscribe = (): void => {
    // TODO: Implement newsletter subscription
    // Email subscription logic would go here
    setEmail("");
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex">
        <div className="relative flex-1 max-w-xs">
          <Mail className="top-1/2 left-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 transform" />
          <Input
            type="email"
            placeholder={LAYOUT_LABELS.footer.emailPlaceholder}
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="pl-10 focus:border-purple-500 border-r-0 rounded-r-none focus:ring-0 h-10"
          />
        </div>
        <Button
          onClick={handleSubscribe}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-l-none min-w-28 h-10 font-medium text-white text-sm"
        >
          {LAYOUT_LABELS.footer.subscribe}
        </Button>
      </div>
    </div>
  );
}
