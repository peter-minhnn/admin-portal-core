import { ReactNode } from 'react';
import { Separator } from '@/components/ui/separator';

type LayoutContentSectionProps = {
  title: string;
  desc: string;
  children: ReactNode;
};

export default function LayoutContentSection({
  title,
  desc,
  children,
}: Readonly<LayoutContentSectionProps>) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-none">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <Separator className="my-4 flex-none" />
      <div className="flex-1 overflow-auto scroll-smooth px-4 md:pb-16">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
