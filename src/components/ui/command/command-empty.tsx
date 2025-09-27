import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";

const CommandEmpty = ({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty> & {
  ref?: React.RefObject<React.ElementRef<typeof CommandPrimitive.Empty> | null>;
}) => (
  <CommandPrimitive.Empty
    ref={ref}
    className="py-6 text-center text-sm"
    {...props}
  />
);

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

export { CommandEmpty };
