import React, { useState } from 'react';

const DeleteButton = ({ type, id, onDelete, setIsDelete }) => {
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleDelete = (e) => {
        e.preventDefault();
        setShowConfirmation(true);
    };
    const handleConfirm = (e) => {
        e.preventDefault();
        onDelete(type, id);
        setShowConfirmation(false);
        setIsDelete((prev) => !prev);
    };
    const handleCancel = (e) => {
        e.preventDefault();
        setShowConfirmation(false);
    };
    return (
        <>
            {!showConfirmation ? (
                <button className="button" onClick={handleDelete}>
                    Delete
                </button>
            ) : (
                <div>
                    <span>Are you sure?</span>
                    <div>
                        <button className="button" onClick={handleConfirm}>
                            Confirm
                        </button>
                        <button className="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteButton;
