'use client'

import { HTMLAttributes, ReactNode, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { cn } from '@/shared/lib'
import { Link, usePathname, useRouter } from '@/shared/configs/i18n/routing'
import { useTranslations } from 'next-intl'

interface SidebarNavProps extends HTMLAttributes<HTMLElement> {
    items: {
        href: string
        title: string
        icon: ReactNode
    }[]
}

export default function SidebarNav({
    className,
    items,
    ...props
}: Readonly<SidebarNavProps>) {
    const pathname = usePathname()
    const navigate = useRouter()
    const t = useTranslations('SettingsMessages')
    const [val, setVal] = useState(pathname ?? '/settings')

    const handleSelect = (e: string) => {
        setVal(e)
        navigate.push(e)
    }

    return (
        <>
            <div className="p-1 md:hidden">
                <Select value={val} onValueChange={handleSelect}>
                    <SelectTrigger className="h-12 sm:w-48">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                        {items.map((item) => (
                            <SelectItem key={item.href} value={item.href}>
                                <div className="flex gap-x-4 px-2 py-1">
                                    <span className="scale-125">
                                        {item.icon}
                                    </span>
                                    <span className="text-md">
                                        {item.title}
                                    </span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="hidden w-full overflow-x-auto bg-background px-1 py-2 md:block">
                <nav
                    className={cn(
                        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
                        className
                    )}
                    {...props}
                >
                    {items.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                buttonVariants({ variant: 'ghost' }),
                                pathname === item.href
                                    ? 'bg-muted hover:bg-muted'
                                    : 'hover:bg-transparent hover:underline',
                                'justify-start'
                            )}
                        >
                            <span className="mr-2">{item.icon}</span>
                            {t(item.title as any)}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    )
}
