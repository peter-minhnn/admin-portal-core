import { create } from 'zustand'
import { AuthUserType } from '@/types/user.type'
import { ModalType } from '@/types/modal.type'
import { Locale } from '@/shared/configs/i18n/config'

/*
 *  USER STORE
 */
type UserStore = {
    userInfo?: AuthUserType
    setUserInfo: (user?: AuthUserType) => void
}

export const useUserStore = create<UserStore>((set) => ({
    userInfo: undefined,
    setUserInfo: (userInfo) => set({ userInfo }),
}))

/*
 *  MODAL STORE
 */
export type ModalStore = {
    modalProps: ModalType
    setModalOpen: (props?: ModalType) => void
}

export const useModalStore = create<ModalStore>((set) => ({
    modalProps: {
        isOpen: false,
        description: '',
        customSize: '',
        title: '',
        modalContent: null,
        modalFooter: null,
        modalButton: null,
    },
    setModalOpen: (modalProps?: ModalType) => set({ modalProps }),
}))

/*
 *  LOCALE STORE
 */
type LocaleStore = {
    locale: Locale
    setLocaleStore: (locale: Locale) => void
}

export const useLocaleStore = create<LocaleStore>((set) => ({
    locale: 'vi',
    setLocaleStore: (locale) => set({ locale }),
}))
