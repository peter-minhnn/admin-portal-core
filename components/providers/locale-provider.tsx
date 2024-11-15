import { useMessages, NextIntlClientProvider, useTimeZone } from 'next-intl'
import type { FC, ReactNode } from 'react'
import { Locale } from '@/shared/configs/i18n/config'

export const LocalesProvider: FC<{
    children: ReactNode
    locale: Locale
}> = ({ children, locale }) => {
    const messages = useMessages()
    const timezone = useTimeZone()

    return (
        <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone={timezone}
        >
            {children}
        </NextIntlClientProvider>
    )
}
