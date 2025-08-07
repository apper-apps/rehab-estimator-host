import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ className, type = "text", error, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base transition-all duration-200 placeholder:text-gray-500",
        "focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
        error && "border-error focus:border-error focus:ring-error/20",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;