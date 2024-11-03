"use client";

import { useModalStore } from "@/states/common.state";
import { ModalType } from "@/types/modal";

export function useModal() {
  const { modalProps, setModalOpen } = useModalStore();

  const openModal = ({
    title,
    modalContent,
    modalButton,
    modalFooter,
    customSize,
  }: ModalType) => {
    setModalOpen({
      isOpen: true,
      title,
      customSize,
      modalContent,
      modalButton,
      modalFooter,
    });
  };

  const closeModal = () => {
    setModalOpen({
      ...modalProps,
      isOpen: false,
    });
  };

  return {
    ...modalProps,
    openModal,
    closeModal,
  };
}
