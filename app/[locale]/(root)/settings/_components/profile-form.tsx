'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'

const profileFormSchema = z.object({
    userName: z.string().min(1, {
        message: 'Username must be at least 1 characters.',
    }),
    email: z
        .string({
            required_error: 'Please select an email to display.',
        })
        .email(),
    firstName: z.string().max(160).min(4),
    lastName: z.string().max(160).min(4),
    phoneNumber: z.string().max(11).min(10),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
// const defaultValues: Partial<ProfileFormValues> = {
//     firstName: '',
//     urls: [
//         { value: 'https://shadcn.com' },
//         { value: 'http://twitter.com/shadcn' },
//     ],
// }

export default function ProfileForm() {
    const t = useTranslations('SettingsMessages')

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        // defaultValues,
        mode: 'onChange',
    })

    const onSubmit = () => {}

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('formProfile.userName')}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t('formProfile.userName')}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is your public display name. It can be your
                                real name or a pseudonym. You can only change
                                this once every 30 days.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('formProfile.email')}</FormLabel>
                            <Input
                                placeholder={t('formProfile.email')}
                                {...field}
                                type="email"
                            />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('formProfile.firstName')}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t('formProfile.firstName')}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can <span>@mention</span> other users and
                                organizations to link to them.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('formProfile.lastName')}</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder={t('formProfile.lastName')}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{t('updateProfileBtn')}</Button>
            </form>
        </Form>
    )
}
