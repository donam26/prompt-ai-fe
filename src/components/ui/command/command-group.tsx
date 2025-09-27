import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

import { cn } from "@/lib/utils";

const CommandGroup = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group> & {
  ref?: React.RefObject<React.ElementRef<typeof CommandPrimitive.Group> | null>;
}) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      "p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 overflow-hidden [&_[cmdk-group-heading]]:font-medium text-foreground [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs",
      className
    )}
    {...props}
  />
);

CommandGroup.displayName = CommandPrimitive.Group.displayName;

export { CommandGroup };
