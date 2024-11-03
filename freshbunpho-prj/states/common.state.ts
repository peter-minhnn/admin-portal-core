import { create } from "zustand";
import { UserType } from "@/types/user.type";
import { ModalType } from "@/types/modal";

/*
 *  USER STORE
 */
type UserStore = {
  userInfo?: UserType;
  setUserInfo: (user?: UserType) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
}));

/*
 *  MODAL STORE
 */
export type ModalStore = {
  modalProps: ModalType;
  setModalOpen: (props?: ModalType) => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  modalProps: {
    isOpen: false,
    view: null,
    customSize: "",
    title: "",
    modalContent: null,
    modalFooter: null,
    modalButton: null,
  },
  setModalOpen: (modalProps?: ModalType) => set({ modalProps }),
}));
