import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocale, useTranslations } from 'next-intl'
import { FilterIcon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomerType, ProductOrderFilterFormData } from '@/types/order.type'
import { ProductFilterFormSchema } from '../../schema'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { IconLoader2, IconRefresh } from '@tabler/icons-react'
import { DateTimePicker } from '@/components/ui/datepicker'
import { isDate } from 'date-fns'
import { useGetCustomers } from '../../_hooks/use-queries'
import { PAGE_SIZE } from '@/shared/enums'
import { get } from 'lodash'
import { RESPONSE_LIST_KEY } from '@/shared/constants'
import InfiniteScroll from '@/components/ui/infinite-scroll'
import { DeliveryOrderData, OrderStatusData, PaymentStatusData } from '../product-order.data'

type ProductOrderFilterProps = {
    onFilters: (data: ProductOrderFilterFormData) => void
    initialFilters?: ProductOrderFilterFormData
}

const defaultFormValues: ProductOrderFilterFormData = {
    fromDate: '',
    toDate: '',
    customerId: 0,
    orderCode: '',
    deliveryType: '',
    orderStatus: '',
    paymentStatus: '',
}

export default function ProductOrderFilters({
    onFilters,
    initialFilters,
}: Readonly<ProductOrderFilterProps>) {
    const t = useTranslations('ProductMessages')
    const tCommon = useTranslations('CommonMessages')
    const locale = useLocale()
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [page, setPage] = useState<number>(0)
    const [customers, setCustomers] = useState<CustomerType[]>([])

    const form = useForm<ProductOrderFilterFormData>({
        resolver: zodResolver(ProductFilterFormSchema),
        defaultValues: initialFilters ?? defaultFormValues,
    })

    const { data: customersData, status: customerStatus } = useGetCustomers({
        pageIndex: page + 1,
        pageSize: PAGE_SIZE,
    })

    const onSubmitFilters = (data: ProductOrderFilterFormData) => {
        onFilters({ ...data })
    }

    const next = useCallback(() => {
        setPage(page + 1)
    }, [page])

    useEffect(() => {
        if (customerStatus === 'pending' || customersData?.type === 'error') {
            return
        }

        const list = get(customersData?.result, RESPONSE_LIST_KEY, [])
        setCustomers((prev) => [...prev, ...list])

        const totalPage = get(customersData?.result, 'meta.pageCount', 0)
        if (page >= totalPage) {
            setHasMore(false)
        }
    }, [customersData, customerStatus, page])

    return (
        <Form {...form}>
            <form
                id="product-order-filters"
                onSubmit={form.handleSubmit(onSubmitFilters)}
                className="h-full flex flex-col justify-between gap-2"
            >
                <div className='flex flex-col gap-2'>
                    <div className="mb-4 flex flex-row justify-between gap-2">
                        <FormField
                            name="fromDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="fromDate">
                                        {t('orders.fromDate')}
                                    </FormLabel>
                                    <DateTimePicker
                                        value={
                                            field.value &&
                                            isDate(new Date(field.value))
                                                ? new Date(field.value)
                                                : undefined
                                        }
                                        onChange={field.onChange}
                                        placeholder={t('orders.selectFromDate')}
                                        className="w-full"
                                        displayFormat={{
                                            hour24: 'yyyy-MM-dd',
                                        }}
                                        locale={locale as any}
                                        granularity="day"
                                    />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="toDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="toDate">
                                        {t('orders.toDate')}
                                    </FormLabel>
                                    <DateTimePicker
                                        value={
                                            field.value &&
                                            isDate(new Date(field.value))
                                                ? new Date(field.value)
                                                : undefined
                                        }
                                        onChange={field.onChange}
                                        placeholder={t('orders.selectToDate')}
                                        className="w-full"
                                        displayFormat={{
                                            hour24: 'yyyy-MM-dd',
                                        }}
                                        locale={locale as any}
                                        granularity="day"
                                    />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <FormField
                            name="orderCode"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel htmlFor="orderCode">
                                        {t('orders.orderCode')}
                                    </FormLabel>
                                    <Input 
                                        {...field}
                                        defaultValue={''}
                                        type="text" 
                                        className='w-full' 
                                        placeholder={t('orders.orderCodePlaceholder')}
                                    />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="customerId"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel htmlFor="customerId">
                                        {t('orders.customerId')}
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue
                                                    placeholder={t('orders.selectCustomer')}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {customers.map((item) => (
                                                <SelectItem
                                                    key={item.id}
                                                    value={String(item.id)}
                                                >
                                                    {item.firstName}{' '}
                                                    {item.lastName}
                                                </SelectItem>
                                            ))}
                                            <InfiniteScroll
                                                hasMore={hasMore}
                                                isLoading={
                                                    customerStatus === 'pending'
                                                }
                                                next={next}
                                                threshold={1}
                                            >
                                                {hasMore && (
                                                    <IconLoader2 className="my-4 h-8 w-8 animate-spin" />
                                                )}
                                            </InfiniteScroll>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <FormField
                            name="deliveryType"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel htmlFor="deliveryType">
                                        {t('orders.deliveryType')}
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue
                                                    placeholder={t('orders.selectDeliveryType')}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {DeliveryOrderData.map((item) => (
                                                <SelectItem
                                                    key={item.code}
                                                    value={item.code}
                                                >
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="orderStatus"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel htmlFor="orderStatus">
                                        {t('orders.orderStatus')}
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue
                                                    placeholder={t('orders.selectOrderStatus')}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {OrderStatusData.map((item) => (
                                                <SelectItem
                                                    key={item.code}
                                                    value={item.code}
                                                >
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row justify-between gap-2">
                        <FormField
                            name="paymentStatus"
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormLabel htmlFor="paymentStatus">
                                        {t('orders.paymentStatus')}
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='w-full'>
                                                <SelectValue
                                                    placeholder={t('orders.selectPaymentStatus')}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {PaymentStatusData.map((item) => (
                                                <SelectItem
                                                    key={item.code}
                                                    value={item.code}
                                                >
                                                    {item.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-2 w-full">
                    <Button
                        size="sm"
                        variant="ringHover"
                        className="w-full"
                        onClick={() => form.reset(defaultFormValues)}
                    >
                        <IconRefresh size={16} className="mr-2" />
                        {tCommon('btnReset')}
                    </Button>
                    <Button
                        size="sm"
                        variant="ringHover"
                        className="w-full"
                        form="product-order-filters"
                        type="submit"
                    >
                        <FilterIcon size={16} className="mr-2" />
                        {tCommon('btnApply')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
