import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PaginationState } from '@/types/common.type'
import {
    addProduct,
    deleteProduct,
    getProducts,
    getProductTypes,
    getUnits,
    updateProduct,
    updateProductPrice,
} from '@/services/product.service'
import {
    ProductFilterParams,
    ProductPriceType,
    ProductType,
} from '@/types/product.type'
import get from 'lodash/get'
import { toast } from 'sonner'

//-------------------------------------UNIT HOOKS----------------------------------------
export const useGetUnits = () => {
    return useQuery({
        queryKey: ['units'],
        queryFn: async () => await getUnits(),
        select: (data) => get(data, 'result.data', []),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    })
}

//-------------------------------------PRODUCT TYPE HOOKS----------------------------------------
export const useGetProductTypes = () => {
    return useQuery({
        queryKey: ['productTypes'],
        queryFn: async () => await getProductTypes(),
        select: (data) => get(data, 'result.data', []),
        refetchOnWindowFocus: false,
    })
}

//-------------------------------------PRODUCT HOOKS-------------------------------------
export const useGetProducts = (
    pagination: PaginationState,
    params: ProductFilterParams
) => {
    return useQuery({
        queryKey: ['products', pagination, params],
        queryFn: async () => await getProducts(pagination, params),
        refetchOnWindowFocus: false,
    })
}

//ADD hook (post product in api)
export const useAddProduct = (
    t: any,
    handleClose: () => void,
    params: ProductFilterParams,
    pagination: PaginationState
) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (product: ProductType) => await addProduct(product),
        onSettled: async () => {
            await queryClient
                .invalidateQueries({
                    queryKey: ['products', pagination, params],
                })
                .finally(() => handleClose())
        },
        onSuccess: () => toast.success(t('notifications.addProductSuccess')),
        onError: () => toast.error(t('notifications.addProductError')),
    })
}

//UPDATE hook (put product in api)
export const useUpdateProduct = (
    t: any,
    handleClose: () => void,
    params: ProductFilterParams,
    pagination: PaginationState
) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (product: ProductType) =>
            await updateProduct(product),
        onSettled: async () => {
            await queryClient
                .invalidateQueries({
                    queryKey: ['products', pagination, params],
                })
                .finally(() => handleClose())
        },
        onSuccess: () => toast.success(t('notifications.updateProductSuccess')),
        onError: () => toast.error(t('notifications.updateProductError')),
    })
}

//DELETE hook (delete product in api)
export const useDeleteProduct = (
    t: any,
    handleClose: () => void,
    params: ProductFilterParams,
    pagination: PaginationState
) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (productCode: string) =>
            await deleteProduct(productCode),
        onSettled: async () => {
            await queryClient
                .invalidateQueries({
                    queryKey: ['products', pagination, params],
                })
                .finally(() => handleClose())
        },
        onSuccess: () => toast.success(t('notifications.deleteProductSuccess')),
        onError: () => toast.error(t('notifications.deleteProductError')),
    })
}

//UPDATE hook (put product price in api)
export const useUpdateProductPrice = (
    t: any,
    handleClose: () => void,
    params: ProductFilterParams,
    pagination: PaginationState
) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (product: ProductPriceType) =>
            await updateProductPrice(product),
        onSettled: async () => {
            await queryClient
                .invalidateQueries({
                    queryKey: ['products', pagination, params],
                })
                .finally(() => handleClose())
        },
        onSuccess: () =>
            toast.success(t('notifications.updateProductPriceSuccess')),
        onError: () => toast.error(t('notifications.updateProductPriceError')),
    })
}
