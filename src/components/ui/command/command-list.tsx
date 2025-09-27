import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

import { cn } from "@/lib/utils";

const CommandList = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.List> & {
  ref?: React.RefObject<React.ElementRef<typeof CommandPrimitive.List> | null>;
}) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn("max-h-[300px] overflow-x-hidden overflow-y-auto", className)}
    {...props}
  />
);

CommandList.displayName = CommandPrimitive.List.displayName;

export { CommandList };
