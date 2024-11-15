import React from 'react'
import { useForm } from 'react-hook-form'
import {
    ProductFilterFormData,
    ProductFilterParams,
} from '@/types/product.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductFilterFormSchema } from '@/app/[locale]/(root)/products/schema'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { CommonCodeType } from '@/types/common.type'
import { FilterIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { IconRefresh } from '@tabler/icons-react'

type ProductFilterProps = {
    productTypes: CommonCodeType[]
    onFilters: (data: ProductFilterParams) => void
    initialFilters?: ProductFilterParams
}

const defaultFormValues: ProductFilterParams = {
    content: '',
    productType: '',
}

export default function ProductFilters({
    productTypes,
    onFilters,
    initialFilters,
}: Readonly<ProductFilterProps>) {
    const t = useTranslations('ProductMessages')
    const tCommon = useTranslations('CommonMessages')
    const form = useForm<ProductFilterFormData>({
        resolver: zodResolver(ProductFilterFormSchema),
        defaultValues: initialFilters ?? defaultFormValues,
    })

    const onSubmitFilters = (data: ProductFilterFormData) => {
        onFilters({
            content: data.content ?? '',
            productType: data.productType ?? '',
        })
    }

    return (
        <Form {...form}>
            <form
                id="product-filters"
                onSubmit={form.handleSubmit(onSubmitFilters)}
                className="h-full flex flex-col justify-between gap-2"
            >
                <div className="mb-4">
                    <FormField
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="content">
                                    {t('content')}
                                </FormLabel>
                                <Input {...field} id="content" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="productType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="content">
                                    {t('content')}
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={t(
                                                    'selectProductTypeCode'
                                                )}
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {productTypes.map((product) => (
                                            <SelectItem
                                                key={product.code}
                                                value={product.code}
                                            >
                                                {product.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
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
                        form="product-filters"
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
