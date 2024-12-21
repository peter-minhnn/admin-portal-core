import React, { ReactElement, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

type ProductOrderFormSkeletonProps = {
  loading: boolean;
};

export default function ProductOrderFormSkeletons({
  loading,
}: Readonly<ProductOrderFormSkeletonProps>) {
  const t = useTranslations('ProductMessages');

  const memoizedSkeletons: ReactElement | null = useMemo(() => {
    if (!loading) return null;

    return (
      <>
        <ScrollArea className="w-full lg:h-[500px] px-2">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['order-info', 'product-order-detail']}
          >
            <AccordionItem value="order-info">
              <AccordionTrigger className="hover:no-underline">
                <Badge variant="primary">
                  <h4 className="text-lg font-semibold leading-none">
                    {t('orders.orderDetailForm')}
                  </h4>
                </Badge>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 px-2">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row justify-between w-full gap-2">
                    <Skeleton className="w-full h-10" />
                    <Skeleton className="w-full h-10" />
                  </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                  <Skeleton className="w-full h-10" />
                  <Skeleton className="w-full h-10" />
                </div>
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-20" />
              </AccordionContent>
            </AccordionItem>
            <div className="flex flex-col gap-2 w-full mt-4">
              <AccordionItem
                value="product-order-detail"
                className="border-b-0"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-2">
                      <Badge variant="primary">
                        <h4 className="text-lg font-semibold leading-none">
                          {t('orders.productOrderDetailForm')}
                        </h4>
                      </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div
                    className={cn(
                      'w-full flex justify-between gap-3 mb-4 pr-2'
                    )}
                  >
                    <Skeleton className="w-full h-10" />
                  </div>
                  <Separator className="mb-4" />
                  <div className="w-full flex flex-col gap-2 justify-between px-2">
                    {[...Array(5)].map((_, index) => (
                      <div key={`${_}-${index}`} className="mb-4 border-b pb-4">
                        <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
                          <div className="mb-2 w-full min-h-fit md:min-h-[90px]">
                            <Skeleton className="w-full h-10" />
                          </div>
                          <div className="mb-2 w-full min-h-fit md:min-h-[90px]">
                            <Skeleton className="w-full h-10" />
                          </div>
                          <div className="mb-2 w-full min-h-fit md:min-h-[90px]">
                            <Skeleton className="w-full h-10" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </div>
          </Accordion>
          <div id="scroll-area-bottom"></div>
        </ScrollArea>
        <div className="flex flex-row justify-end gap-2">
          <Skeleton className="w-24 h-10" />
          <Skeleton className="w-24 h-10" />
        </div>
      </>
    );
  }, [loading, t]);

  return <>{memoizedSkeletons}</>;
}
