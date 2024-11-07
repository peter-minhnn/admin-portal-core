import { ReactNode } from "react";

export type ModalType = {
  isOpen: boolean;
  title: string;
  description: string;
  modalContent: ReactNode;
  modalButton?: ReactNode;
  customSize?: string;
  modalFooter?: ReactNode;
};
