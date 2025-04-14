import React, { useState } from 'react';

const DeleteButton = ({ type, id, onDelete, setIsDelete }: any) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    interface HandleDeleteEvent extends React.MouseEvent<HTMLButtonElement> {}

    const handleDelete = (e: HandleDeleteEvent) => {
        e.preventDefault();
        setShowConfirmation(true);
    };
    interface HandleConfirmEvent extends React.MouseEvent<HTMLButtonElement> {}

    const handleConfirm = (e: HandleConfirmEvent) => {
        e.preventDefault();
        onDelete(type, id);
        setShowConfirmation(false);
        setIsDelete((prev: boolean) => !prev);
    };
    interface HandleCancelEvent extends React.MouseEvent<HTMLButtonElement> {}

    const handleCancel = (e: HandleCancelEvent) => {
        e.preventDefault();
        setShowConfirmation(false);
    };
    return (
        <>
            {!showConfirmation ? (
                <button className='button' onClick={handleDelete}>
                    Delete
                </button>
            ) : (
                <div>
                    <span>Are you sure?</span>
                    <div>
                        <button className='button' onClick={handleConfirm}>
                            Confirm
                        </button>
                        <button className='button' onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteButton;
