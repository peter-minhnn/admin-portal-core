'use client'

import { DateTimePicker } from '@/components/ui/datepicker'
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import SyntaxHighlighter from '@/components/ui/syntax-highlighter'
import {
    controlledDatePickerCodes,
    formDatePickerCodes,
} from '@/shared/data/samples.data'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { formatDate } from 'date-fns'
import { toast } from 'sonner'

const FormDatePickerSchema = z.object({
    selectedDate: z.date({ required_error: 'Please select a date' }),
})

export default function DatePickerPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        undefined
    )

    const form = useForm<z.infer<typeof FormDatePickerSchema>>({
        resolver: zodResolver(FormDatePickerSchema),
    })

    const onSubmit = (data: z.infer<typeof FormDatePickerSchema>) => {
        toast(() => (
            <span className="text-black font-semibold">
                {JSON.stringify(formatDate(data.selectedDate, 'yyyy-MM-dd'))}
            </span>
        ))
    }

    return (
        <>
            <h2 className="text-lg font-bold md:text-xl">SAMPLE DATE PICKER</h2>
            <div className="flex flex-col gap-12 lg:flex-row">
                <div className="flex-1">
                    <Tabs defaultValue="preview">
                        <TabsList>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="code">Code</TabsTrigger>
                        </TabsList>
                        <TabsContent value="preview">
                            <div className="flex flex-col h-auto rounded border gap-4 p-4">
                                <Label htmlFor="example1">
                                    Controlled Date Picker
                                </Label>
                                <DateTimePicker
                                    value={selectedDate}
                                    onChange={(date) =>
                                        setSelectedDate(date ?? new Date())
                                    }
                                    displayFormat={{ hour24: 'yyyy/MM/dd' }}
                                    className="w-[240px]"
                                />
                                <Separator />
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="flex flex-col gap-2"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="selectedDate"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col w-[240px]">
                                                    <FormLabel>
                                                        Form Date Picker
                                                    </FormLabel>
                                                    <DateTimePicker
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        granularity="day"
                                                        displayFormat={{
                                                            hour24: 'yyyy/MM/dd',
                                                        }}
                                                        hasError={
                                                            !!form.formState
                                                                .errors
                                                                .selectedDate
                                                        }
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button
                                            type="submit"
                                            variant="default"
                                            className="max-w-20"
                                        >
                                            Submit
                                        </Button>
                                    </form>
                                </Form>
                            </div>
                        </TabsContent>
                        <TabsContent value="code">
                            <SyntaxHighlighter
                                content={controlledDatePickerCodes}
                            />
                            <SyntaxHighlighter content={formDatePickerCodes} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
