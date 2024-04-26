import { create } from 'zustand';

type ExitModalState = {
    isOpen: boolean,
    open: () => void,
    close: () => void,
}

export const useExitModal = create<ExitModalState>((set) => ({
    isOpen: false,
    open: () => set((state) => ({ isOpen: true })),
    close: () => set({ isOpen: false }),
}));


