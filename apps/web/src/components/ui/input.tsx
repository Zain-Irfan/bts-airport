import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-[rgba(192,192,192,0.25)] bg-[rgba(13,13,15,0.6)] px-3.5 py-1 text-base text-[#F8F8F8] shadow-[inset_0_1px_0_rgba(192,192,192,0.05)] transition-all duration-300 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#F8F8F8] placeholder:text-[#A5A7AA] hover:border-[rgba(192,192,192,0.4)] focus-visible:outline-none focus-visible:border-[rgba(153, 153, 153,0.55)] focus-visible:ring-[3px] focus-visible:ring-[rgba(51, 51, 51,0.32)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

