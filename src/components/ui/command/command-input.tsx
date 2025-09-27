import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const CommandInput = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input> & {
  ref?: React.RefObject<React.ElementRef<typeof CommandPrimitive.Input> | null>;
}) => (
  <div
    className="flex items-center px-3 border-input border-b"
    cmdk-input-wrapper=""
  >
    <Search className="opacity-50 mr-2 w-4 h-4 shrink-0" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex bg-transparent disabled:opacity-50 py-3 rounded-md outline-none w-full h-11 placeholder:text-muted-foreground text-sm disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  </div>
);

CommandInput.displayName = CommandPrimitive.Input.displayName;

export { CommandInput };
