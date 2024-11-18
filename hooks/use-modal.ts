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
      title,
      description,
      customSize,
      modalContent,
      modalButton,
      modalFooter,
    });
  };

  const closeModal = () => {
    setModalOpen({
      ...modalProps,
      isClosed: true,
      isOpen: false,
    });
  };

  return {
    ...modalProps,
    openModal,
    closeModal,
  };
}
