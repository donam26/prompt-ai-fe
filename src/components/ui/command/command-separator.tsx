import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

import { cn } from "@/lib/utils";

const CommandSeparator = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator> & {
  ref?: React.RefObject<React.ElementRef<
    typeof CommandPrimitive.Separator
  > | null>;
}) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 bg-border h-px", className)}
    {...props}
  />
);
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

export { CommandSeparator };
