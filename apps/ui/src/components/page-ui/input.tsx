import { forwardRef, type ComponentProps, type Ref } from "react";
import { cn } from "@/lib/utils";

const Input = forwardRef(function Input(
  props: ComponentProps<"input"> & { className?: string },
  ref: Ref<HTMLInputElement>
) {
  const { className, type = "text", ...rest } = props;
  const baseStyles =
    "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50";
  return (
    <input
      ref={ref}
      type={type}
      className={cn(baseStyles, className)}
      {...rest}
    />
  );
});

Input.displayName = "Input";

export { Input };
