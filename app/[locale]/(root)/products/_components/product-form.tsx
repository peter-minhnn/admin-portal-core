'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { MRT_Row as RowCell } from 'material-react-table'
import { useTranslations } from 'next-intl'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { AutosizeTextarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ProductFormSchema } from '@/app/[locale]/(root)/products/schema'
import {
    ProductFilterParams,
    ProductFormData,
    UnitType,
} from '@/types/product.type'
import { useModal } from '@/hooks/use-modal'
import { IconDeviceFloppy, IconX } from '@tabler/icons-react'
import FileUpload from '@/components/upload'
import { CommonCodeType, PaginationState } from '@/types/common.type'
import {
    useAddProduct,
    useUpdateProduct,
} from '@/app/[locale]/(root)/products/_hooks/use-queries'
import { generateUniqueId } from '@/shared/lib'
import { useUserStore } from '@/states/common.state'

type ProductFormProps = {
    units: UnitType[]
    productTypes: CommonCodeType[]
    rowData?: RowCell<ProductFormData>
    filterParams: ProductFilterParams
    pagination: PaginationState
}

const defaultProductData = {
    productCode: '',
    productName: '',
    productPrice: '',
    productType: '',
    unitCode: '',
    productMinQty: '',
    productMaxQty: '',
    productDesc: '',
    productImage: '',
    companyId: 1,
} as ProductFormData

export default function ProductForm({
    units = [],
    productTypes = [],
    rowData,
    filterParams,
    pagination,
}: Readonly<ProductFormProps>) {
    const t = useTranslations('ProductMessages')
    const { closeModal } = useModal()
    const { userInfo } = useUserStore()
    const modalType = rowData?.id ? 'edit' : 'add'
    const form = useForm<ProductFormData>({
        resolver: zodResolver(ProductFormSchema),
        defaultValues: rowData?.id
            ? {
                  productCode: rowData.original.productCode,
                  productName: rowData.original.productName,
                  productPrice: String(rowData.original.productPrice),
                  productType: rowData.original.productType,
                  unitCode: rowData.original.unitCode,
                  productMinQty: String(rowData.original.productMinQty),
                  productMaxQty: String(rowData.original.productMaxQty),
                  productDesc: rowData.original.productDesc,
                  productImage: rowData.original.productImage,
                  companyId: rowData.original.companyId,
              }
            : {
                  ...defaultProductData,
                  productType: productTypes[0]?.code,
                  unitCode: units[0]?.unitCode,
              },
    })
    const [files, setFiles] = useState<File[] | null>(null)

    const { mutateAsync: addProduct, status: addMutateStatus } = useAddProduct(
        t,
        closeModal,
        filterParams,
        pagination
    )
    const { mutateAsync: updateProduct, status: updateMutateStatus } =
        useUpdateProduct(t, closeModal, filterParams, pagination)

    const onSubmit = async (data: ProductFormData) => {
        const obj = {
            unitCode: data.unitCode,
            productDesc: data.productDesc ?? '',
            productName: data.productName,
            productType: data.productType,
            productPrice: Number(data.productPrice),
            productMinQty: Number(data.productMinQty),
            productMaxQty: Number(data.productMaxQty),
            productCode:
                modalType === 'edit'
                    ? data.productCode
                    : generateUniqueId(data.productType),
            productImage: data.productImage ?? '',
            companyId: userInfo?.companyId ?? 1,
        }
        if (modalType === 'edit') {
            await updateProduct(obj)
            return
        }
        await addProduct(obj)
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.key
        if (!/^\d$/.test(key) && !['Backspace'].includes(key)) {
            event.preventDefault()
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
            >
                <div className="flex flex-col gap-2">
                    <FormField
                        control={form.control}
                        name="productCode"
                        render={({ field }) => (
                            <FormItem className="hidden">
                                <FormLabel>Product Code</FormLabel>
                                <Input
                                    type="text"
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                    disabled
                                />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row justify-between w-full gap-2">
                        <FormField
                            name="productType"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel required>
                                        {t('productType')}
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
                                    <FormMessage namespace="ProductMessages" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="productName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel required>
                                        {t('productName')}
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                        placeholder={t('productName')}
                                        hasError={
                                            !!form.formState.errors.productName
                                        }
                                    />
                                    <FormMessage namespace="ProductMessages" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row gap-2 w-full">
                        <FormField
                            name="productPrice"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel required>
                                        {t('productPrice')}
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                        onKeyDown={handleKeyPress}
                                        placeholder={t('productPrice')}
                                        hasError={
                                            !!form.formState.errors.productPrice
                                        }
                                    />
                                    <FormMessage namespace="ProductMessages" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="unitCode"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel required>
                                        {t('unitCode')}
                                    </FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={t(
                                                        'selectUnitCode'
                                                    )}
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {units.map((unit) => (
                                                <SelectItem
                                                    key={unit.unitCode}
                                                    value={unit.unitCode}
                                                >
                                                    {unit.unitName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage namespace="ProductMessages" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-row gap-2 w-full">
                        <FormField
                            name="productMinQty"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel required>
                                        {t('productMinQty')}
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                        onKeyDown={handleKeyPress}
                                        placeholder={t('productMinQty')}
                                        hasError={
                                            !!form.formState.errors
                                                .productMinQty
                                        }
                                    />
                                    <FormMessage namespace="ProductMessages" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="productMaxQty"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel required>
                                        {t('productMaxQty')}
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        value={field.value ?? ''}
                                        onChange={field.onChange}
                                        onKeyDown={handleKeyPress}
                                        placeholder={t('productMaxQty')}
                                        hasError={
                                            !!form.formState.errors
                                                .productMaxQty
                                        }
                                    />
                                    <FormMessage namespace="ProductMessages" />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <FormField
                    name="productDesc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('productDesc')}</FormLabel>
                            <AutosizeTextarea
                                value={field.value ?? ''}
                                onChange={field.onChange}
                                placeholder={t('productDesc')}
                                autoSize
                            />
                            <FormMessage namespace="ProductMessages" />
                        </FormItem>
                    )}
                />
                <FormField
                    name="productImage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t('productDesc')}</FormLabel>
                            <FileUpload
                                files={files}
                                onValueChange={(e) => {
                                    console.log(e)
                                    setFiles(e)
                                    field.onChange(
                                        '/images/products/bun-han-the.jpg'
                                    )
                                }}
                            />
                            <FormMessage namespace="ProductMessages" />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row justify-end gap-2">
                    <Button
                        type="button"
                        title={t('modalCancelBtn')}
                        variant="outline"
                        onClick={closeModal}
                        disabled={
                            addMutateStatus === 'pending' ||
                            updateMutateStatus === 'pending'
                        }
                    >
                        <IconX size={16} />
                        {t('modalCancelBtn')}
                    </Button>
                    <Button
                        type="submit"
                        title={t('modalSaveBtn')}
                        variant="secondary"
                        disabled={
                            addMutateStatus === 'pending' ||
                            updateMutateStatus === 'pending'
                        }
                        loading={
                            addMutateStatus === 'pending' ||
                            updateMutateStatus === 'pending'
                        }
                    >
                        <IconDeviceFloppy size={16} />
                        {t('modalSaveBtn')}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
