import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

import { cn } from "@/lib/utils";

const CommandItem = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item> & {
  ref?: React.RefObject<React.ElementRef<typeof CommandPrimitive.Item> | null>;
}) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex items-center aria-selected:bg-accent data-[disabled=true]:opacity-50 px-2 py-1.5 rounded-sm outline-none text-sm aria-selected:text-accent-foreground cursor-default data-[disabled=true]:pointer-events-none select-none",
      className
    )}
    {...props}
  />
);

CommandItem.displayName = CommandPrimitive.Item.displayName;

export { CommandItem };
