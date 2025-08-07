import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ className, variant = "primary", size = "md", children, icon, iconPosition = "left", loading = false, ...props }, ref) => {
  const variants = {
    primary: "bg-gradient-primary hover:shadow-lg hover:scale-105 text-white shadow-md",
    secondary: "bg-gradient-secondary hover:shadow-lg hover:scale-105 text-white shadow-md",
    accent: "bg-gradient-accent hover:shadow-lg hover:scale-105 text-white shadow-md",
    outline: "border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:scale-105",
    ghost: "text-primary-600 hover:bg-primary-50 hover:scale-105",
    danger: "bg-gradient-to-r from-error to-red-400 hover:shadow-lg hover:scale-105 text-white shadow-md"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
        variants[variant],
        sizes[size],
        loading && "cursor-not-allowed",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />}
      {!loading && icon && iconPosition === "left" && <ApperIcon name={icon} className="w-4 h-4" />}
      {children}
      {!loading && icon && iconPosition === "right" && <ApperIcon name={icon} className="w-4 h-4" />}
    </button>
  );
});

Button.displayName = "Button";

export default Button;