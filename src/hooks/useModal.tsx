import { useState, useCallback } from 'react';

export interface UseModalResult {
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    toggleModal: () => void; 
}

const useModal = (initialState: boolean = false): UseModalResult => {
    const [isOpen, setIsOpen] = useState<boolean>(initialState);

    const openModal = useCallback(() => setIsOpen(true), []);
    const closeModal = useCallback(() => setIsOpen(false), []);
    const toggleModal = useCallback(() => setIsOpen(prev => !prev), []);

    return {
        isOpen,
        openModal,
        closeModal,
        toggleModal,
    };
};

export default useModal;