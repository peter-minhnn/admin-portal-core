'use client';

import { useAlertModal } from '@/hooks/use-alert-modal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useTranslations } from 'next-intl';

export default function GlobalAlertModal() {
  const t = useTranslations('CommonMessages');
  const {
    isOpen,
    title,
    customSize,
    btnConfirmText,
    btnCancelText,
    message,
    onConfirm,
    onCancel,
    modalButton,
  } = useAlertModal();

  return (
    <AlertDialog open={isOpen}>
      {modalButton && (
        <AlertDialogTrigger asChild>{modalButton}</AlertDialogTrigger>
      )}
      <AlertDialogContent className={customSize}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || t('alertTitle')}</AlertDialogTitle>
          <AlertDialogDescription>
            {message || t('alertMessage')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {btnCancelText ?? t('btnClose')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {btnConfirmText ?? t('btnOk')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
