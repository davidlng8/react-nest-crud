import { cn } from "@/lib/utils";
import { forwardRef, type ComponentProps, type Ref } from "react";

const Label = forwardRef(function Label(
  props: ComponentProps<"label"> & { className?: string },
  ref: Ref<HTMLLabelElement>
) {
  const { className, ...rest } = props;
  const baseStyles = "text-sm font-medium leading-none";
  return <label ref={ref} className={cn(baseStyles, className)} {...rest} />;
});

Label.displayName = "Label";

export { Label };
