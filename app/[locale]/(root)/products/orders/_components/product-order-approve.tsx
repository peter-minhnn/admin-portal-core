'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { AutosizeTextarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { cn } from '@/shared/lib';
import { toast } from 'sonner';
import { useModal } from '@/hooks/use-modal';
import { useApproveOrder } from '@/app/[locale]/(root)/products/_hooks/use-queries';
import { OrderStatus } from '@/types/order.type';

type ProductOrderApproveProps = {
  orderCode: string;
};

export function ProductOrderApprove({
  orderCode,
}: Readonly<ProductOrderApproveProps>) {
  const tCommon = useTranslations('CommonMessages');
  const t = useTranslations('ProductMessages');
  const { closeModal } = useModal();
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('');
  const [approvedDesc, setApprovedDesc] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { mutateAsync, status } = useApproveOrder(t, closeModal);

  const handleSaveChanges = async () => {
    if (orderStatus !== 'APPROVED' && !approvedDesc) {
      toast.error(t('errors.orders.approveReasonRequired'));
      return;
    }
    await mutateAsync({
      orderCode,
      orderStatus,
      approvedDesc,
    });
    setIsSaved(false);
  };

  return (
    <div className="flex flex-col gap-6 space-y-2 mt-4">
      <RadioGroup
        defaultValue={orderStatus}
        onValueChange={(value) => {
          setOrderStatus(value as OrderStatus);
          if (value === 'APPROVED') {
            setApprovedDesc('');
            setIsSaved(false);
          }
        }}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="APPROVED" id="r1" />
          <Label htmlFor="r1" className="cursor-pointer">
            {t('orders.approved')}
          </Label>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="REJECTED" id="r2" />
            <Label htmlFor="r2" className="cursor-pointer">
              {t('orders.rejected')}
            </Label>
          </div>
          <AutosizeTextarea
            value={approvedDesc}
            onChange={(e) => setApprovedDesc(e.target.value)}
            autoSize
            placeholder={t('orders.approveReasonPlaceholder')}
            className={cn('w-full', {
              hidden: orderStatus !== 'REJECTED',
            })}
            hasError={orderStatus === 'REJECTED' && !approvedDesc && isSaved}
          />
          <p
            className={cn('text-red-500 text-sm font-medium text-destructive', {
              hidden: orderStatus !== 'REJECTED',
            })}
          >
            {t('errors.orders.approveReasonRequired')}
          </p>
        </div>
      </RadioGroup>
      <div className="flex flex-row justify-end gap-2">
        <Button
          type="button"
          size="sm"
          title={tCommon('btnCancel')}
          variant="outline"
          onClick={() => closeModal()}
          disabled={status === 'pending'}
        >
          <IconX size={16} />
          {tCommon('btnCancel')}
        </Button>
        <Button
          type="button"
          size="sm"
          title={tCommon('btnSave')}
          variant="shine"
          onClick={async () => {
            setIsSaved(true);
            await handleSaveChanges();
          }}
          disabled={status === 'pending'}
          loading={status === 'pending'}
        >
          <IconDeviceFloppy size={16} />
          {tCommon('btnSave')}
        </Button>
      </div>
    </div>
  );
}
