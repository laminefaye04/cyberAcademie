import * as React from "react"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const cardVariants = cva(
  "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        priority:
          "border-cyber-500/40 border-l-4 border-l-warning bg-warning/[0.04] shadow-[0_0_20px_rgba(251,191,36,0.08)]",
        success:
          "border-success/30 border-l-4 border-l-success bg-success/[0.03]",
        locked:
          "border-border/60 bg-night-900/60 text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Card({
  className,
  variant,
  hover = false,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants> & { hover?: boolean }) {
  return (
    <div
      data-slot="card"
      className={cn(
        cardVariants({ variant }),
        hover &&
          "transition-all duration-200 hover:-translate-y-1 hover:border-cyber-500/50 hover:shadow-[0_8px_30px_rgba(79,209,197,0.12)]",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
