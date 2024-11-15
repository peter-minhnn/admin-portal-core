'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    controlledMultipleSelectorCodes,
    defaultMultipleSelectorCodes,
    formMultipleSelectorCodes,
} from '@/shared/data/samples.data'
import SyntaxHighlighter from '@/components/ui/syntax-highlighter'
import { Label } from '@/components/ui/label'
import MultipleSelector, { Option } from '@/components/ui/multiple-selector'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'

const FormSchema = z.object({
    selectedOptions: z.array(
        z.object({
            label: z.string(),
            value: z.string(),
        }),
        {
            required_error: 'Please select an option',
        }
    ),
})

export default function ExampleMultipleSelectorPage() {
    const [selectedOptions, setSelectedOptions] = useState<Option[]>([])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        // Do something with the form data
        toast(() => (
            <span className="text-black font-semibold">
                {JSON.stringify(data.selectedOptions)}
            </span>
        ))
    }

    return (
        <>
            <h2 className="text-lg font-bold md:text-xl">
                SAMPLE MULTIPLE SELECTOR
            </h2>
            <div className="flex flex-col gap-12 lg:flex-row min-h-[500px]">
                <div className="flex-1">
                    <Tabs defaultValue="preview">
                        <TabsList>
                            <TabsTrigger value="preview">Preview</TabsTrigger>
                            <TabsTrigger value="code">Code</TabsTrigger>
                        </TabsList>
                        <TabsContent value="preview">
                            <div className="flex flex-col h-auto rounded border gap-4 p-4">
                                <Label htmlFor="grid-example-1">
                                    Default Multiple Selector
                                </Label>
                                <MultipleSelector
                                    options={[
                                        { label: 'Option 1', value: 'option1' },
                                        { label: 'Option 2', value: 'option2' },
                                        { label: 'Option 3', value: 'option3' },
                                        { label: 'Option 4', value: 'option4' },
                                        { label: 'Option 5', value: 'option5' },
                                    ]}
                                    placeholder={'Select Options'}
                                />
                                <Label htmlFor="grid-example-1">
                                    State Multiple Selector
                                </Label>
                                <MultipleSelector
                                    options={[
                                        { label: 'Option 1', value: 'option1' },
                                        { label: 'Option 2', value: 'option2' },
                                        { label: 'Option 3', value: 'option3' },
                                        { label: 'Option 4', value: 'option4' },
                                        { label: 'Option 5', value: 'option5' },
                                    ]}
                                    value={selectedOptions}
                                    onChange={(e) => setSelectedOptions(e)}
                                    placeholder={'Select Options'}
                                />
                                {/* Form */}
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="flex flex-col gap-2"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="selectedOptions"
                                            render={({
                                                field,
                                                formState: { errors },
                                            }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Form Multiple Selector
                                                    </FormLabel>
                                                    <MultipleSelector
                                                        options={[
                                                            {
                                                                label: 'Option 1',
                                                                value: 'option1',
                                                            },
                                                            {
                                                                label: 'Option 2',
                                                                value: 'option2',
                                                            },
                                                            {
                                                                label: 'Option 3',
                                                                value: 'option3',
                                                            },
                                                            {
                                                                label: 'Option 4',
                                                                value: 'option4',
                                                            },
                                                            {
                                                                label: 'Option 5',
                                                                value: 'option5',
                                                            },
                                                        ]}
                                                        value={field.value}
                                                        onChange={
                                                            field.onChange
                                                        }
                                                        placeholder={
                                                            'Select Options'
                                                        }
                                                        hasError={
                                                            !!errors.selectedOptions
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
                                content={defaultMultipleSelectorCodes}
                            />
                            <SyntaxHighlighter
                                content={controlledMultipleSelectorCodes}
                            />
                            <SyntaxHighlighter
                                content={formMultipleSelectorCodes}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    )
}
