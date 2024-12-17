'use client';

import React, {
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { ProductPriceType } from '@/types/product.type';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { useGetProductPriceListDetail } from '@/app/[locale]/(root)/products/_hooks/use-queries';
import { IconLoader2 } from '@tabler/icons-react';
import get from 'lodash/get';
import { formatDate } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { formatCurrency, generateUniqueId } from '@/shared/lib';
import {
  LocaleCurrencyConst,
  LocaleCurrencyUnitConst,
} from '@/shared/constants';
import {
  Locale,
  LocaleCurrency,
  LocaleUnitCurrency,
} from '@/shared/configs/i18n/config';
import { Badge } from '@/components/ui/badge';
import { useIsMounted } from '@/hooks/use-is-mounted';
import { Label } from '@/components/ui/label';

interface ProductPriceHistoryProps {
  productCode: string;
  unitCode: string;
}

const ProductPriceHistory = memo(
  ({ productCode, unitCode }: Readonly<ProductPriceHistoryProps>) => {
    const t = useTranslations('ProductMessages');
    const locale = useLocale() as Locale;
    const isMounted = useIsMounted();
    const [page, setPage] = useState<number>(0);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [products, setProducts] = useState<ProductPriceType[]>([]);

    const {
      data: productsDetail,
      status,
      refetch,
    } = useGetProductPriceListDetail(productCode, unitCode, page + 1);

    const next = useCallback(() => {
      setPage(page + 1);
    }, [page]);

    const memoizedEmptyList: ReactElement | null = useMemo(() => {
      if (products.length || status === 'pending') return null;

      return (
        <h1 className="text-lg font-semibold text-center w-full mb-4">
          No result
        </h1>
      );
    }, [products, status]);

    const memoizedProducts: ReactElement | null = useMemo(() => {
      if (!products.length) return null;

      return (
        <div className="flex w-full flex-col gap-4">
          {products?.map((item) => (
            <div
              key={item.id}
              className="border border-input rounded-2xl flex flex-col w-full p-4 gap-3"
            >
              <div className="flex flex-row justify-between gap-2">
                <div className="flex flex-col md:flex-row justify-start items-center gap-2">
                  <Label className="text-md">{t('updatePriceDateTime')}:</Label>
                  <Badge
                    variant={'secondary'}
                    className="w-fit h-fit items-center text-md font-bold"
                  >
                    {formatDate(item.createdAt!, 'yyyy-MM-dd HH:mm:ss')}
                  </Badge>
                </div>
                <Badge
                  variant={item.isActive ? 'primary' : 'destructive'}
                  className="w-fit h-fit items-center"
                >
                  {item.isActive ? t('using') : t('notUsing')}
                </Badge>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="flex flex-row items-center gap-2">
                  <Label>{t('priceSell')}: </Label>
                  <span className="text-md font-semibold">
                    {formatCurrency(
                      item.price,
                      LocaleCurrencyConst[locale] as LocaleCurrency,
                      LocaleCurrencyUnitConst[locale] as LocaleUnitCurrency
                    )}
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <Label>{t('originalPrice')}: </Label>
                  <span className="text-md font-semibold">
                    {formatCurrency(
                      item.originalPrice,
                      LocaleCurrencyConst[locale] as LocaleCurrency,
                      LocaleCurrencyUnitConst[locale] as LocaleUnitCurrency
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <InfiniteScroll
            hasMore={hasMore}
            isLoading={status === 'pending'}
            next={next}
            threshold={1}
          >
            {hasMore && <IconLoader2 className="my-4 h-8 w-8 animate-spin" />}
          </InfiniteScroll>
        </div>
      );
    }, [products, hasMore, status, next, t, locale]);

    useEffect(() => {
      if (
        status !== 'success' ||
        !isMounted ||
        productsDetail?.type === 'error'
      ) {
        setProducts([]);
        return;
      }

      const list = get(productsDetail, 'result.data', []) as ProductPriceType[];
      if (list.length) {
        setProducts((prev) => [
          ...prev,
          ...list.map((v) => ({ ...v, id: generateUniqueId() })),
        ]);
      }

      const totalPage = get(productsDetail, 'result.meta.pageCount', 0);
      if (page >= totalPage) {
        setHasMore(false);
      }
    }, [productsDetail, status, page, isMounted]);

    useEffect(() => {
      refetch().finally();
    }, [page, refetch]);

    return (
      isMounted && (
        <div
          className="max-h-[1000px] w-full overflow-y-auto mt-4"
          key={productCode}
        >
          {memoizedProducts}
          {memoizedEmptyList}
        </div>
      )
    );
  }
);

ProductPriceHistory.displayName = 'ProductPriceHistory';
export default ProductPriceHistory;
