import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva(
  "rounded-xl transition-all duration-200",
  {
    variants: {
      variant: {
        default: "bg-white shadow-subtle hover:shadow-medium",
        glass: "bg-white/80 backdrop-blur-sm border border-gray-200 shadow-card hover:shadow-lg",
        gradient: "bg-gradient-primary border border-gray-200 shadow-card hover:shadow-lg",
        outline: "bg-white border border-gray-300 shadow-subtle hover:shadow-medium",
        flat: "bg-gray-50 border border-gray-200",
      },
      padding: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
        none: "p-0",
      },
      animation: {
        none: "",
        fadeIn: "animate-fadeIn",
        slideUp: "animate-slideUp",
        slideInRight: "animate-slideInRight",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      animation: "none",
    },
  }
);

export interface CardPremiumProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: React.ElementType;
}

const CardPremium = React.forwardRef<HTMLDivElement, CardPremiumProps>(
  ({ className, variant, padding, animation, as: Component = "div", ...props }, ref) => {
    return (
      <Component
        className={cn(cardVariants({ variant, padding, animation, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
CardPremium.displayName = "CardPremium";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { CardPremium, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };