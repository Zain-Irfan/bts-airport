"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export type CalendarSize = "default" | "booking"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  size = "default",
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
  size?: CalendarSize
}) {
  const defaultClassNames = getDefaultClassNames()
  const booking = size === "booking"

  const DayButtonWithSize = React.useCallback(
    (btnProps: React.ComponentProps<typeof DayButton>) => (
      <CalendarDayButton {...btnProps} booking={booking} />
    ),
    [booking],
  )

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "bg-background group/calendar rounded-xl p-3 [--cell-size:2.45rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        booking &&
          "[--cell-size:3.35rem] min-w-[22.5rem] rounded-2xl border border-[rgba(192,192,192,0.12)] bg-[linear-gradient(165deg,rgba(38,38,44,0.98)_0%,rgba(20,20,24,0.99)_45%,rgba(14,14,18,1)_100%)] p-5 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.65),0_0_0_1px_rgba(51, 51, 51,0.12)]",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-4 md:flex-row",
          defaultClassNames.months,
        ),
        month: cn(
          "flex w-full flex-col gap-4",
          booking && "gap-3",
          defaultClassNames.month,
        ),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between px-1",
          booking && "px-0.5",
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-8 w-8 rounded-lg border border-white/10 bg-card select-none p-0 text-foreground shadow-sm hover:bg-muted aria-disabled:opacity-50",
          booking &&
            "h-10 w-10 rounded-xl border-[rgba(192,192,192,0.14)] bg-[rgba(26,26,30,0.95)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[rgba(153, 153, 153,0.35)] hover:bg-[rgba(51, 51, 51,0.12)]",
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-8 w-8 rounded-lg border border-white/10 bg-card select-none p-0 text-foreground shadow-sm hover:bg-muted aria-disabled:opacity-50",
          booking &&
            "h-10 w-10 rounded-xl border-[rgba(192,192,192,0.14)] bg-[rgba(26,26,30,0.95)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[rgba(153, 153, 153,0.35)] hover:bg-[rgba(51, 51, 51,0.12)]",
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          "flex h-9 w-full items-center justify-center px-10 pb-0.5",
          booking && "h-12 px-12 pb-1",
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          "bg-popover absolute inset-0 opacity-0",
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          "select-none text-[1.08rem] font-bold tracking-tight text-foreground",
          booking && "text-xl font-semibold tracking-tight text-[#F8F8F8] sm:text-[1.35rem]",
          captionLayout === "label"
            ? ""
            : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label,
        ),
        table: cn("mt-3 w-full border-collapse", booking && "mt-4"),
        weekdays: cn(
          "flex border-b border-[rgba(192,192,192,0.08)] pb-2",
          booking && "border-[rgba(192,192,192,0.12)] pb-2.5",
          defaultClassNames.weekdays,
        ),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.72rem] font-semibold uppercase tracking-[0.12em]",
          booking &&
            "text-[0.78rem] font-semibold tracking-[0.14em] text-[#A5A7AA]",
          defaultClassNames.weekday,
        ),
        week: cn("mt-1.5 flex w-full", booking && "mt-2.5", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          "text-muted-foreground select-none text-[0.8rem]",
          defaultClassNames.week_number,
        ),
        day: cn(
          "group/day relative aspect-square h-full w-full select-none p-0 text-center [&:first-child[data-selected=true]_button]:rounded-l-lg [&:last-child[data-selected=true]_button]:rounded-r-lg",
          defaultClassNames.day,
        ),
        range_start: cn(
          "bg-accent rounded-l-md",
          defaultClassNames.range_start,
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "font-bold text-highlight ring-1 ring-inset ring-highlight/35 data-[selected=true]:ring-0",
          defaultClassNames.today,
        ),
        outside: cn(
          "text-muted-foreground/45 opacity-65 aria-selected:text-muted-foreground/55 [&_button]:text-muted-foreground/50",
          defaultClassNames.outside,
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled,
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...rootProps }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...rootProps}
            />
          )
        },
        Chevron: ({ className, orientation, ...chevronProps }) => {
          const icon = booking ? "size-5" : "size-4"
          if (orientation === "left") {
            return (
              <ChevronLeftIcon
                className={cn(icon, className)}
                {...chevronProps}
              />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn(icon, className)}
                {...chevronProps}
              />
            )
          }

          return (
            <ChevronDownIcon
              className={cn(icon, className)}
              {...chevronProps}
            />
          )
        },
        DayButton: DayButtonWithSize,
        WeekNumber: ({ children, ...weekProps }) => {
          return (
            <td {...weekProps}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  booking = false,
  ...props
}: React.ComponentProps<typeof DayButton> & { booking?: boolean }) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-highlight data-[selected-single=true]:text-highlight-foreground data-[selected-single=true]:shadow-sm data-[range-middle=true]:bg-highlight/25 data-[range-middle=true]:text-foreground data-[range-start=true]:bg-highlight data-[range-start=true]:text-highlight-foreground data-[range-end=true]:bg-highlight data-[range-end=true]:text-highlight-foreground group-data-[focused=true]/day:border-highlight/50 group-data-[focused=true]/day:ring-highlight/30 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 rounded-lg font-medium leading-none hover:bg-muted data-[range-end=true]:rounded-lg data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-lg group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-2 [&>span]:text-xs [&>span]:opacity-70",
        booking &&
          "min-h-[--cell-size] rounded-xl text-[15px] font-semibold tracking-tight text-[#F0F0F0] hover:bg-[rgba(192,192,192,0.08)] data-[selected-single=true]:shadow-[0_6px_20px_-6px_rgba(51, 51, 51,0.55)] data-[selected-single=true]:ring-1 data-[selected-single=true]:ring-[rgba(192,192,192,0.2)]",
        modifiers.outside &&
          "!text-muted-foreground/55 opacity-70 hover:bg-muted/40 data-[selected-single=true]:bg-muted data-[selected-single=true]:text-foreground",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }
