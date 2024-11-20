'use client';

import { useAlertModalStore } from '@/states/common.state';
import { AlertModalType } from '@/types/modal.type';

export function useAlertModal() {
  const { modalProps, setAlertModalOpen } = useAlertModalStore();

  const openAlertModal = ({
    title,
    btnConfirmText,
    btnCancelText,
    onConfirm,
    onCancel,
    message,
    customSize,
    modalButton,
  }: AlertModalType) => {
    setAlertModalOpen({
      isOpen: true,
      title,
      message,
      customSize,
      btnConfirmText,
      btnCancelText,
      onConfirm,
      onCancel,
      modalButton,
    });
  };

  const closeAlertModal = () => {
    setAlertModalOpen({
      ...modalProps,
      isOpen: false,
      onConfirm: () => {},
      onCancel: () => {},
    });
  };

  return {
    ...modalProps,
    openAlertModal,
    closeAlertModal,
  };
}
