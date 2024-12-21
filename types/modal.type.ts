import { ReactNode } from 'react';

export type ModalType = {
  isOpen: boolean;
  title: string;
  description: string;
  modalContent: ReactNode;
  modalButton?: ReactNode;
  customSize?: string;
  modalFooter?: ReactNode;
  isClosed?: boolean;
  isRefresh?: boolean;
};

export type AlertModalType = {
  isOpen: boolean;
  title: string;
  message: string;
  btnConfirmText?: string;
  btnCancelText?: string;
  customSize?: string;
  onConfirm: () => any | Promise<any>;
  onCancel: () => any | Promise<any>;
  modalButton?: ReactNode;
};
