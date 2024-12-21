'use client';

import { useModalStore } from '@/states/common.state';
import { ModalType } from '@/types/modal.type';

export function useModal() {
  const { modalProps, setModalOpen } = useModalStore();

  const openModal = ({
    title,
    description,
    modalContent,
    modalButton,
    modalFooter,
    customSize,
  }: ModalType) => {
    setModalOpen({
      isOpen: true,
      isClosed: false,
      isRefresh: false,
      title,
      description,
      customSize,
      modalContent,
      modalButton,
      modalFooter,
    });
  };

  const closeModal = (isRefresh?: boolean) => {
    setModalOpen({
      ...modalProps,
      isClosed: true,
      isOpen: false,
      isRefresh: isRefresh || true,
    });
  };

  return {
    ...modalProps,
    openModal,
    closeModal,
  };
}
