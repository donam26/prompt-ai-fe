import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

import { cn } from "@/lib/utils";

const Command = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive> & {
  ref?: React.RefObject<React.ElementRef<typeof CommandPrimitive> | null>;
}) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      "flex flex-col bg-popover rounded-md w-full h-full overflow-hidden text-popover-foreground",
      className
    )}
    {...props}
  />
);
Command.displayName = CommandPrimitive.displayName;

export { Command };
