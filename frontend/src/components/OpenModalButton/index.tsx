import React from 'react';
import { useModal } from '../../context/Modal';

interface OpenModalButtonProps {
    modalComponent: React.ReactNode; // component to render inside the modal
    buttonText: string; // text of the button that opens the modal
    onButtonClick?: () => void; // optional: callback function that will be called once the button that opens the modal is clicked
    onModalClose?: () => void; // optional: callback function that will be called once the modal is closed
}

function OpenModalButton ({
    modalComponent,
    buttonText,
    onButtonClick,
    onModalClose,
}: OpenModalButtonProps) {
    const modalContext = useModal();
    if (!modalContext) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    const { setModalContent, setOnModalClose } = modalContext;

    const onClick = () => {
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onButtonClick) onButtonClick();
    };

    return (
        <button onClick={onClick} className='modalButton'>
            {buttonText}{' '}
        </button>
    );
}

export default OpenModalButton;
