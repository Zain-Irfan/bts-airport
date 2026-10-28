import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("BTS-faq-item", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex flex-1 cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left text-[15px] font-medium leading-snug transition-all duration-300 ease-out md:px-6 md:py-6 md:text-base",
        "text-foreground hover:text-gold-ink",
        className
      )}
      {...props}
    >
      <span className="flex-1">{children}</span>
      <span
        aria-hidden
        className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-muted text-gold-ink transition-all duration-300 ease-out group-hover:border-gold/50 group-data-[state=open]:rotate-45 group-data-[state=open]:border-gold group-data-[state=open]:bg-gold group-data-[state=open]:text-gold-foreground"
      >
        <Plus className="h-4 w-4" />
      </span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(
        "px-5 pb-5 pt-0 text-[14.5px] leading-[1.85] text-body md:px-6 md:pb-6 md:text-[15px]",
        className,
      )}
    >
      <div className="BTS-divider-silver mb-4 opacity-50" />
      {children}
    </div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
