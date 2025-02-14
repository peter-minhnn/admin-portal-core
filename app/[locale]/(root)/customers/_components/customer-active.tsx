'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { useModal } from '@/hooks/use-modal';
import { CustomerFormData } from '@/types/customer.type';
import { useUpdateCustomer } from '@/app/[locale]/(root)/customers/_hooks/use-queries';

type CustomerActiveProps = {
  rowData: CustomerFormData;
};

type YnOptions = 'Y' | 'N';

export function CustomerActive({ rowData }: Readonly<CustomerActiveProps>) {
  const tCommon = useTranslations('CommonMessages');
  const t = useTranslations('CustomerMessages');
  const { closeModal } = useModal();
  const [status, setStatus] = useState<YnOptions>('Y');

  const { mutateAsync: updateCustomer, status: updateMutateStatus } =
    useUpdateCustomer(t, closeModal);

  const handleSaveChanges = async () => {
    const obj = {
      id: rowData.id,
      email: rowData.email,
      phoneNumber: rowData.phoneNumber,
      firstName: rowData.firstName,
      lastName: rowData.lastName,
      address: rowData.address,
      gender: Number(rowData.gender),
      companyId: rowData.companyId,
      avatar: rowData.avatar,
      birthDate: rowData.birthDate,
      isActive: status === 'Y',
    };

    await updateCustomer(obj);
  };

  useEffect(() => {
    if (rowData) {
      setStatus(!rowData.isActive ? 'Y' : 'N');
    }
  }, [rowData]);

  return (
    <div className="flex flex-col gap-6 space-y-2 mt-4">
      <RadioGroup
        defaultValue={status}
        onValueChange={(value) => {
          setStatus(value as YnOptions);
        }}
        value={status}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Y" id="r1" />
          <Label htmlFor="r1" className="cursor-pointer">
            {t('active')}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="N" id="r2" />
          <Label htmlFor="r2" className="cursor-pointer">
            {t('inactive')}
          </Label>
        </div>
      </RadioGroup>
      <div className="flex flex-row justify-end gap-2">
        <Button
          type="button"
          size="sm"
          title={tCommon('btnCancel')}
          variant="outline"
          onClick={() => closeModal()}
          disabled={updateMutateStatus === 'pending'}
        >
          <IconX size={16} />
          {tCommon('btnCancel')}
        </Button>
        <Button
          type="button"
          size="sm"
          title={tCommon('btnSave')}
          variant="save"
          onClick={async () => {
            await handleSaveChanges();
          }}
          disabled={updateMutateStatus === 'pending'}
          loading={updateMutateStatus === 'pending'}
        >
          <IconDeviceFloppy size={16} />
          {tCommon('btnSave')}
        </Button>
      </div>
    </div>
  );
}
