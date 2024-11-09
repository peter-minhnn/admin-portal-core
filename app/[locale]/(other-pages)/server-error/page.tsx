import React from "react";
import { Button } from '@/components/ui/button'
import { cn } from '@/shared/lib'
import {useRouter} from "next/navigation";
import {pageRoutes} from "@/shared/routes/pages.route";
import {useTranslations} from "next-intl";
import {getTranslations} from "next-intl/server";
import {metaObject} from "@/shared/configs";

export async function generateMetadata() {
    "use server";
    const t = await getTranslations("MetaDataMessages");

    return {
        ...metaObject(t("internalServerError")),
    };
}

export default function InternalServerError() {
    const router = useRouter();
    const t = useTranslations('CommonMessages');

    return (
        <div className={cn('h-svh w-full')}>
            <div className='m-auto flex h-full w-full flex-col items-center justify-center gap-2'>
                <h1 className='text-[7rem] font-bold leading-tight'>500</h1>
                <span className='font-medium'>{t("pageErrorTitle")} {`:')`}</span>
                <p className='text-center text-muted-foreground'
                   dangerouslySetInnerHTML={{__html: t("pageErrorDescription", {br: "<br/>"})}}>
                </p>
                <div className='mt-6 flex gap-4'>
                    <Button variant='outline' onClick={() => router.back()}>
                        {t("goBack")}
                    </Button>
                    <Button onClick={() => router.push(pageRoutes.dashboard)} variant="destructive">
                        {t("backToHome")}
                    </Button>
                </div>
            </div>
        </div>
    )
}