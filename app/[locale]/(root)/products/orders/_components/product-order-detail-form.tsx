import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusIcon, SearchIcon, TrashIcon } from 'lucide-react';
import NumberInput from '@/components/number-input';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import InputButton from '@/components/input-button';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import ProductOptions from '@/app/[locale]/(root)/products/orders/_components/product-options';
import { ProductPriceType } from '@/types/product.type';
import { toast } from 'sonner';
import { cn } from '@/shared/lib';
import { OrderDetailRequestType } from '@/types/order.type';

type OrderDetailFormProps = {
  form: UseFormReturn<any>;
};

const SearchIconProp = () => <SearchIcon size={16} />;

const OrderDetailForm = ({ form }: Readonly<OrderDetailFormProps>) => {
  const t = useTranslations('ProductMessages');
  const tCommon = useTranslations('CommonMessages');
  const [isProductSelectOpen, setIsProductSelectOpen] =
    useState<boolean>(false);
  const [productRowSelection, setProductRowSelection] =
    useState<ProductPriceType | null>(null);
  const { fields, append, remove, insert } = useFieldArray({
    control: form.control,
    name: 'orderDetails',
    keyName: 'orderId',
  });
  const [rowIndex, setRowIndex] = useState<number>(0);

  const defaultValue = useMemo(
    () => ({ productCode: '', quantity: 0, price: 0 }),
    []
  );

  // Add a new empty order detail row
  const addOrderDetail = () => {
    if (form.watch('orderStatus') === 'APPROVED') {
      toast.error(t('errors.orders.cannotDeleteOrderApproved'));
      return;
    }
    insert(0, defaultValue);
  };

  // Remove an order detail row
  const removeOrderDetail = (index: number) => {
    if (form.watch('orderStatus') === 'APPROVED') {
      toast.error(t('errors.orders.cannotDeleteOrderApproved'));
      return;
    }
    remove(index);
  };

  const handleToggleProductModal = (index: number) => {
    setRowIndex(index);
    setIsProductSelectOpen(true);
  };

  const getProductDetail = (index: number) => {
    return form.watch('orderDetails')[index]?.productCode;
  };

  const createPlusIcon = () => {
    return <PlusIcon size={16} className="text-white" />;
  };

  useEffect(() => {
    if (!fields.length) {
      append({ ...defaultValue });
    }
  }, [fields, append, defaultValue]);

  return (
    <>
      <AccordionItem value="product-order-detail" className="border-b-0">
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
            className={cn('w-full flex justify-end pr-2', {
              hidden: form.watch('orderStatus') === 'APPROVED',
            })}
          >
            <Button
              type="button"
              className="min-w-fit h-7 bg-[#3C603C] hover:bg-[#3C603C] text-white"
              onClick={addOrderDetail}
              size="sm"
              title={t('addProductModalTitle')}
              Icon={createPlusIcon}
              iconPlacement="left"
              variant="expandIcon"
              disabled={form.watch('orderStatus') === 'APPROVED'}
            >
              {t('addProductModalTitle')}
            </Button>
          </div>
          <div className="w-full flex flex-col gap-2 justify-between">
            {fields.map((field, index) => (
              <div
                key={field.orderId}
                id={field.orderId}
                className="mb-4 border-b pb-4"
              >
                <div className="flex flex-row gap-2 justify-between items-center">
                  <div className="mb-2 w-full min-h-[90px]">
                    <FormField
                      key={field.orderId}
                      control={form.control}
                      name={`orderDetails.${index}.productCode`}
                      render={({ field }) => (
                        <FormItem className="min-w-64">
                          <FormLabel>{t('productCode')}</FormLabel>
                          <InputButton
                            onClick={() => handleToggleProductModal(index)}
                            title={t('selectedProductPlaceholder')}
                            Icon={SearchIconProp}
                            iconPlacement={'right'}
                            variant="expandIcon"
                            hasError={
                              !!(form.formState.errors.orderDetails as any)?.[
                                index
                              ]?.productCode
                            }
                            disabled={form.watch('orderStatus') === 'APPROVED'}
                          >
                            {field.value || t('selectedProductPlaceholder')}
                          </InputButton>
                          <FormMessage namespace="ProductMessages" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-2 w-full min-h-[90px]">
                    <NumberInput
                      form={form}
                      key={field.orderId}
                      name={`orderDetails.${index}.quantity`}
                      label={t('orders.quantity')}
                      placeholder={t('orders.quantity')}
                      namespace="ProductMessages"
                      hasError={
                        !!(form.formState.errors.orderDetails as any)?.[index]
                          ?.quantity
                      }
                      disabled={form.watch('orderStatus') === 'APPROVED'}
                    />
                  </div>
                  <div className="mb-2 w-full min-h-[90px]">
                    <NumberInput
                      key={field.orderId}
                      form={form}
                      name={`orderDetails.${index}.price`}
                      label={t('priceSell')}
                      placeholder={t('priceSell')}
                      namespace="ProductMessages"
                      hasError={
                        !!(form.formState.errors.orderDetails as any)?.[index]
                          ?.price
                      }
                      disabled
                    />
                  </div>
                  {fields.length > 1 && (
                    <div
                      className={cn('flex items-end justify-end h-[25px]', {
                        hidden: form.watch('orderStatus') === 'APPROVED',
                      })}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="button"
                              className="bg-red-500 hover:bg-red-600 min-w-8 h-8 bg-transparent hover:bg-transparent hover:text-red-500/90"
                              onClick={() => removeOrderDetail(index)}
                              size="icon"
                            >
                              <TrashIcon size={20} className="text-red-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {t('orders.deleteProductDetailRow', {
                              productCode: getProductDetail(index),
                            })}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <Dialog open={isProductSelectOpen} onOpenChange={setIsProductSelectOpen}>
        <DialogContent className="max-w-full overflow-auto">
          <DialogHeader>
            <DialogTitle>{t('title')}</DialogTitle>
            <DialogDescription> </DialogDescription>
          </DialogHeader>
          <ProductOptions setRowSelection={setProductRowSelection} />
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setIsProductSelectOpen(false)}
              size="sm"
              variant="outline"
            >
              <IconX size={16} />
              {tCommon('btnClose')}
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsProductSelectOpen(false);
                const findItemExist = form
                  .watch('orderDetails')
                  .find(
                    (item: OrderDetailRequestType) =>
                      item.productCode === productRowSelection?.productCode
                  );
                if (productRowSelection && !findItemExist) {
                  form.setValue(
                    `orderDetails.${rowIndex}.productCode`,
                    productRowSelection.productCode
                  );
                  form.setValue(
                    `orderDetails.${rowIndex}.price`,
                    productRowSelection.price
                  );
                  form.setValue(
                    `orderDetails.${rowIndex}.unitCode`,
                    productRowSelection.unitCode
                  );
                }
              }}
              variant="secondary"
              size="sm"
            >
              <IconDeviceFloppy size={16} />
              {tCommon('btnConfirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderDetailForm;
