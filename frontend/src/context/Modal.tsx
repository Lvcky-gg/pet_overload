import React, { useRef, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext<{
    modalRef: React.RefObject<HTMLDivElement>;
    modalContent: React.ReactNode;
    setModalContent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
    setOnModalClose: React.Dispatch<React.SetStateAction<(() => void) | null>>;
    closeModal: () => void;
} | null>(null);

export function ModalProvider ({ children }: { children: React.ReactNode }) {
    const modalRef = useRef<HTMLDivElement>(null!);
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [onModalClose, setOnModalClose] = useState<(() => void) | null>(null);

    const closeModal = () => {
        setModalContent(null); // clear the modal contents
        // If callback function is truthy, call the callback function and reset it
        // to null:
        if (typeof onModalClose === 'function') {
            setOnModalClose(null);
            onModalClose();
        }
    };

    const contextValue = {
        modalRef, // reference to modal div
        modalContent, // React component to render inside modal
        setModalContent, // function to set the React component to render inside modal
        setOnModalClose, // function to set the callback function called when modal is closing
        closeModal, // function to close the modal
    };

    return (
        <>
            <ModalContext.Provider value={contextValue}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} className='modal-provider-container' />
            <div ref={modalRef} className='modal-provider-container'></div>
        </>
    );
}

export function Modal () {
    const modalContext = useContext(ModalContext);
    if (!modalContext) {
        throw new Error('ModalContext must be used within a ModalProvider');
    }
    const { modalRef, modalContent, closeModal } = modalContext;
    if (!modalRef || !modalRef.current || !modalContent) return null;

    return ReactDOM.createPortal(
        <div id='modal'>
            <div id='modal-background' onClick={closeModal} />
            <div id='modal-content'>{modalContent}</div>
        </div>,
        modalRef.current
    );
}

export const useModal = () => useContext(ModalContext);
