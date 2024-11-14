import {Dispatch, ReactNode, SetStateAction, useState} from "react";
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {cn} from "@/shared/lib";
import {useIsMobile} from "@/hooks/use-mobile";

type DrawerLayoutProps = {
    children: ReactNode;
    openButtonLabel: string;
    openButtonIcon?: ReactNode;
    openButtonClassName?: string;
    headerTitle: string;
    headerDescription?: string;
    footerContents?: ReactNode;
    setOpen: Dispatch<SetStateAction<boolean>>;
    open: boolean;
};

export default function DrawerLayout({
                                         children,
                                         openButtonLabel,
                                         openButtonIcon,
                                         openButtonClassName,
                                         headerTitle,
                                         headerDescription = "",
                                         footerContents,
                                         setOpen,
                                         open
                                     }: DrawerLayoutProps) {
    const isMobile = useIsMobile();

    return (
        <>
            <div className="hidden md:inline-block">
                {!isMobile && (
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className={cn("w-fit", openButtonClassName)}
                            >
                                {openButtonIcon}
                                {openButtonLabel}
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="gap-4 flex flex-col">
                            <SheetHeader>
                                <SheetTitle>{headerTitle}</SheetTitle>
                                <SheetDescription>
                                    {headerDescription}
                                </SheetDescription>
                            </SheetHeader>
                            {children}
                            <SheetFooter>
                                <SheetClose asChild>
                                    {footerContents}
                                </SheetClose>
                            </SheetFooter>
                        </SheetContent>
                    </Sheet>
                )}
            </div>
            <div className="inline-block md:hidden">
                {isMobile && (
                    <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger asChild>
                            <Button variant="outline" size="sm" className={cn("w-fit", openButtonClassName)}>
                                {openButtonIcon}
                                {openButtonLabel}
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="mx-auto w-full max-w-sm min-h-[300px]">
                                <DrawerHeader>
                                    <DrawerTitle>{headerTitle}</DrawerTitle>
                                    <DrawerDescription>{headerDescription}</DrawerDescription>
                                </DrawerHeader>
                                {children}
                                {footerContents && (
                                    <DrawerFooter>
                                        <div className="flex flex-row gap-2">
                                            {footerContents}
                                            <DrawerClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DrawerClose>
                                        </div>
                                    </DrawerFooter>
                                )}
                            </div>
                        </DrawerContent>
                    </Drawer>
                )}
            </div>
        </>
    );
}