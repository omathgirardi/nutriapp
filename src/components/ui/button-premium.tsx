import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-70 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-gradient-button text-white shadow-md hover:shadow-lg focus:ring-primary-200",
        outline: "bg-white text-primary-600 border border-primary-300 shadow-subtle hover:border-primary-400 hover:shadow-medium focus:ring-primary-100",
        ghost: "bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 focus:ring-gray-200",
        secondary: "bg-secondary-500 text-white shadow-md hover:bg-secondary-600 hover:shadow-lg focus:ring-secondary-200",
        destructive: "bg-red-500 text-white shadow-md hover:bg-red-600 hover:shadow-lg focus:ring-red-200",
        link: "text-primary-500 underline-offset-4 hover:underline",
        subtle: "bg-primary-50 text-primary-700 hover:bg-primary-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 py-1 text-xs",
        lg: "h-12 px-6 py-3 text-base",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, asChild = false, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };