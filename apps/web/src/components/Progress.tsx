"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const calcValue = (value:any) => {
    if (value === undefined) {
        return 0
    }
    if (value < 0) {
        return 0
    }
    if (value > 100) {
        return 100
    }
    return value
}

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
        trackClassName?: string;
        style?: 'width' | 'transform'
    }
>(({ className, value, trackClassName, style='transform', ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn(
            "relative h-2 w-full overflow-hidden rounded-full bg-primary/20 box-border",
            className
        )}
        {...props}
    >
        <div className={`relative h-full w-full flex-1 bg-secondary transition-all box-border`}>
            <ProgressPrimitive.Indicator
                className={`h-full w-full flex-1 bg-primary transition-all box-border rounded-[4px] ${trackClassName}`}
                style={style==='transform'?{ transform: `translateX(-${100 - (value || 0)}%)` }:{ width: `${calcValue(value)}%` }}
            />
        </div>
    </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }