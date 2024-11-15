'use client'
import { useReducer } from 'react'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form' // Shadcn UI import
import { Input } from '@/components/ui/input' // Shandcn UI Input
import { UseFormReturn } from 'react-hook-form'
import { Locale } from '@/shared/configs/i18n/config'
import { useLocale } from 'next-intl'

type TextInputProps = {
    form: UseFormReturn<any>
    name: string
    label: string
    placeholder: string
    namespace: string
}

const NumberFormatter = {
    vi: 'vi-VN',
    ko: 'ko-KR',
} as Record<Locale, string>

const numberFormatter = (locale: Locale) =>
    Intl.NumberFormat(NumberFormatter[locale])

export default function NumberInput(props: Readonly<TextInputProps>) {
    const locale = useLocale() as Locale

    const initialValue = props.form.getValues()[props.name]
        ? numberFormatter(locale).format(props.form.getValues()[props.name])
        : ''

    const [value, setValue] = useReducer((_: any, next: string) => {
        const digits = next.replace(/\D/g, '')
        return numberFormatter(locale).format(Number(digits) / 100)
    }, initialValue)

    function handleChange(realChangeFn: Function, formattedValue: string) {
        const digits = formattedValue.replace(/\D/g, '')
        const realValue = Number(digits) / 100
        realChangeFn(realValue)
    }

    return (
        <FormField
            control={props.form.control}
            name={props.name}
            render={({ field }) => {
                field.value = value
                const _change = field.onChange

                return (
                    <FormItem>
                        <FormLabel>{props.label}</FormLabel>
                        <FormControl>
                            <Input
                                placeholder={props.placeholder}
                                type="text"
                                {...field}
                                onChange={(ev) => {
                                    setValue(ev.target.value)
                                    handleChange(_change, ev.target.value)
                                }}
                                value={value}
                                hasError={Boolean(
                                    props.form.formState.errors[props.name]
                                )}
                            />
                        </FormControl>
                        <FormMessage namespace={props.namespace} />
                    </FormItem>
                )
            }}
        />
    )
}
