'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/shared/lib'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
    className,
    classNames,
    showOutsideDays = true,
    ...props
}: CalendarProps) {
    return (
        <DayPicker
            showOutsideDays={showOutsideDays}
            className={cn('p-3', className)}
            classNames={{
                ...classNames,
            }}
            // components={{
            //     IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
            //     IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
            // }}
            {...props}
        />
    )
}
Calendar.displayName = 'Calendar'

export { Calendar }
