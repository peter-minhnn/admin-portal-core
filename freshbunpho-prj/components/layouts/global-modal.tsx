"use client";

import { useModal } from "@/hooks/use-modal";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalTrigger,
} from "@/components/ui/responsive-modal";

export default function GlobalModal() {
  const { isOpen, title, modalContent, modalFooter, modalButton, customSize } =
    useModal();

  return (
    <ResponsiveModal open={isOpen}>
      {modalButton && (
        <ResponsiveModalTrigger asChild>{modalButton}</ResponsiveModalTrigger>
      )}
      <ResponsiveModalContent className={customSize}>
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>{title}</ResponsiveModalTitle>
          {modalContent}
        </ResponsiveModalHeader>
        {modalFooter && (
          <ResponsiveModalFooter>{modalFooter}</ResponsiveModalFooter>
        )}
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
}
